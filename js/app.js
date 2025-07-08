/**
 * info
 */

class MXRecordApp {
    constructor() {
        this.domainInput = null;
        this.checkBtn = null;
        this.exportBtn = null;
        this.clearBtn = null;
        this.resultsBody = null;
        
        this.init();
    }


    init() {
        // loding DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    // setupapp
    setupApp() {
        this.initElements();
        this.bindEvents();
        this.setupExamples();
        
        // 初始化
        updateStatus('等待检测...', 'idle');
        window.dnsChecker.initProviders();
    }

    // DOMMMMMMMMMMMMMMMMMMMMMMMM
    initElements() {
        this.domainInput = document.getElementById('domainInput');
        this.checkBtn = document.getElementById('checkBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.resultsBody = document.getElementById('resultsBody');
    }

    // 绑定
    bindEvents() {
        // 检测
        this.checkBtn.addEventListener('click', () => this.handleCheck());
        
        // 导出
        this.exportBtn.addEventListener('click', () => this.handleExport());
        
        // 清除
        this.clearBtn.addEventListener('click', () => this.handleClear());
        
        // 输入框回车
        this.domainInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.handleCheck();
            }
        });
    }

    // 示例域名点击
    setupExamples() {
        document.querySelectorAll('.example-item').forEach(item => {
            item.addEventListener('click', () => {
                const domain = item.getAttribute('data-domain');
                this.domainInput.value = domain;
                this.domainInput.focus();
            });
        });
    }
    async handleCheck() {
        const input = this.domainInput.value.trim();
        if (!input) {
            updateStatus('请输入邮箱后缀', 'error');
            this.domainInput.focus();
            return;
        }

        const domains = parseDomains(input);
        if (domains.length === 0) {
            updateStatus('未找到有效的域名', 'error');
            this.domainInput.focus();
            return;
        }

        this.setButtonsState(true);
        
        try {

            updateStatus(`开始检测 ${domains.length} 个域名...`, 'processing');
         const results = await window.dnsChecker.checkDomains(domains);

            updateStatus(`检测完成！共检测 ${domains.length} 个域名`, 'success');
            this.exportBtn.disabled = false;
            
        } catch (error) {
            console.error('检测过程中发生错误:', error);
            updateStatus('检测过程中发生错误', 'error');
        } finally {
            this.setButtonsState(false);
        }
    }
// 导出
    handleExport() {
        const results = window.dnsChecker.getResults();
        if (results.length === 0) {
            updateStatus('没有可导出的结果', 'warning');
            return;
        }
// TIME
        const exportData = {
            exportTime: new Date().toISOString(),
            totalDomains: results.length,
            results: results
        };

        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        exportToJSON(exportData, `mx-records-${timestamp}.json`);
        
        updateStatus('结果已导出', 'success');
    }
    handleClear() {
        this.domainInput.value = '';

        window.dnsChecker.clearResults();
        this.resultsBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: var(--gray);">
                    输入域名并点击"检测MX记录"开始查询
                </td>
            </tr>
        `;

        this.exportBtn.disabled = true;
        updateStatus('等待检测...', 'idle');
        updateProgress(0, 0);

        this.domainInput.focus();
    }

    setButtonsState(disabled) {
        this.checkBtn.disabled = disabled;
        this.clearBtn.disabled = disabled;
        
        if (disabled) {
            this.checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 检测中...';
        } else {
            this.checkBtn.innerHTML = '<i class="fas fa-search"></i> 检测MX记录';
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {

    window.mxApp = new MXRecordApp();
    

    console.log('邮箱MX记录检测工具已启动');
    console.log('支持的DNS服务商:', window.DNS_PROVIDERS?.map(p => p.name) || []);
});

// 全局错误
window.addEventListener('error', function(e) {
    console.error('应用发生错误:', e.error);
    updateStatus('应用发生错误，请刷新页面重试', 'error');
});

window.addEventListener('online', function() {
    updateStatus('网络连接已恢复', 'success');
});

window.addEventListener('offline', function() {
    updateStatus('网络连接已断开', 'error');
});