/**
 * DNS MX记录检测核心功能
 */

class DNSChecker {
    constructor() {
        this.providers = window.DNS_PROVIDERS || [];
        this.results = [];
        this.maxRetries = 2;
        this.timeout = 8000;
    }
    initProviders() {
        this.providers.forEach(provider => {
            provider.active = true;
            const element = document.getElementById(`provider-${provider.id}`);
            if (element) {
                element.classList.remove('provider-active');
            }
        });
    }

    // 标记provider - active
    markProviderActive(providerId) {
        const provider = this.providers.find(p => p.id === providerId);
        if (provider) {
            provider.active = true;
            const element = document.getElementById(`provider-${provider.id}`);
            if (element) {
                element.classList.add('provider-active');
            }
        }
    }

    // 标记DNS服务商为不可用
    markProviderInactive(providerId) {
        const provider = this.providers.find(p => p.id === providerId);
        if (provider) {
            provider.active = false;
            const element = document.getElementById(`provider-${provider.id}`);
            if (element) {
                element.classList.remove('provider-active');
            }
        }
    }

    // 检测单个域名的MX记录
    async checkMXRecord(domain) {

        const resultsBody = document.getElementById('resultsBody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="domain-cell">${domain}</td>
            <td id="mx-${domain}"><i class="fas fa-spinner fa-spin"></i> 检测中...</td>
            <td id="status-${domain}"><span class="status-badge status-warning">检测中</span></td>
            <td id="dns-${domain}">-</td>
        `;
        resultsBody.appendChild(row);
        const result = {
            domain: domain,
            mxRecords: [],
            status: '检测中',
            dnsProvider: '',
            error: '',
            timestamp: new Date().toISOString()
        };
        this.results.push(result);

        let success = false;


        for (const provider of this.providers) {
            if (!provider.active) continue;

            //fresh机制
            for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
                try {
                    updateStatus(`正在检测 ${domain} (尝试: ${attempt + 1})`, 'processing');
                    this.markProviderActive(provider.id);

                    const mxRecords = await this.queryMXRecord(domain, provider);
                    
                    if (mxRecords && mxRecords.length > 0) {
                        // sueecss to find MX记录
                        result.mxRecords = mxRecords;
                        result.status = '成功';
                        result.dnsProvider = provider.name;

                        this.updateResultRow(domain, mxRecords, 'success', provider.name);
                        success = true;
                        updateStatus(`${domain} 检测成功`, 'success');
                        return result;
                    } else {
                        // 无MX记录
						
						
						
                        result.mxRecords = [];
                        result.status = '未找到MX记录';
                        result.dnsProvider = provider.name;

                        this.updateResultRow(domain, [], 'warning', provider.name);
                        success = true;
                        updateStatus(`${domain} 未找到MX记录`, 'warning');
                        return result;
                    }
                } catch (error) {
                    console.error(`[${provider.name}] ${domain} 检测失败:`, error);
                    
                    if (attempt < this.maxRetries) {
                        updateStatus(`${domain} 检测失败，重试中 (${attempt + 1}/${this.maxRetries})`, 'error');
                        await delay(1000); // 重试等1s
                    } else {
                        updateStatus(`${domain} 检测失败，尝试下一个DNS服务商`, 'error');
                    }
                    
                    result.error = error.message;
                }
            }
            this.markProviderInactive(provider.id);
        }

        // if all error
        if (!success) {
            result.status = '失败';
            result.error = '所有DNS服务商均不可用';
            
            this.updateResultRow(domain, [], 'error', '无可用服务商');
            updateStatus(`${domain} 检测失败: 所有DNS服务商均不可用`, 'error');
        }

        return result;
    }

    async queryMXRecord(domain, provider) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(
                `${provider.url}?name=${domain}&type=MX`,
                {
                    headers: {
                        'Accept': 'application/dns-json',
                        'Cache-Control': 'no-cache'
                    },
                    signal: controller.signal
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`DNS查询失败: ${response.status}`);
            }

            const data = await response.json();

            if (data.Answer && data.Answer.length > 0) {
                return data.Answer
                    .filter(record => record.type === 15) 
                    .map(record => {
                        const match = record.data.match(/^\d+\s+(.+)$/);
                        return match ? match[1] : record.data;
                    });
            }

            return [];
        } finally {
            clearTimeout(timeoutId);
        }
    }


    updateResultRow(domain, mxRecords, status, dnsProvider) {
        const mxCell = document.getElementById(`mx-${domain}`);
        const statusCell = document.getElementById(`status-${domain}`);
        const dnsCell = document.getElementById(`dns-${domain}`);

        if (mxRecords.length > 0) {
            mxCell.innerHTML = mxRecords.map(mx => 
                `<div class="mx-record">${mx}</div>`
            ).join('');
        } else {
            mxCell.innerHTML = status === 'error' ? '检测失败' : '未找到MX记录';
        }

        let statusBadge = '';
        switch (status) {
            case 'success':
                statusBadge = '<span class="status-badge status-success">成功</span>';
                break;
            case 'warning':
                statusBadge = '<span class="status-badge status-warning">未找到</span>';
                break;
            case 'error':
                statusBadge = '<span class="status-badge status-error">失败</span>';
                break;
        }

        statusCell.innerHTML = statusBadge;
        dnsCell.textContent = dnsProvider;
    }

// 批量
    async checkDomains(domains) {
        this.results = [];
        this.initProviders();

        const resultsBody = document.getElementById('resultsBody');
        resultsBody.innerHTML = '';

        updateProgress(0, domains.length);

        // 每批3个域
        const batchSize = 3;
        for (let i = 0; i < domains.length; i += batchSize) {
            const batch = domains.slice(i, i + batchSize);
            await Promise.all(batch.map(domain => this.checkMXRecord(domain)));
            
    
            updateProgress(i + batch.length, domains.length);
        }

        return this.results;
    }

    getResults() {
        return this.results;
    }

    clearResults() {
        this.results = [];
        this.initProviders();
    }
}


window.dnsChecker = new DNSChecker();