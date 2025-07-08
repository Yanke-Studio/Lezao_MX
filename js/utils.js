/**
 * 工具函数
 */

// parsedomains
function parseDomains(input) {

    return input.split(/[,;\s\n]+/)
        .map(domain => domain.trim().toLowerCase())
        .filter(domain => {
            // 域名验证
            return domain && /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(domain);
        });
}
function updateProgress(completed, total) {
    if (total === 0) return;
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const percent = Math.min(100, Math.round((completed / total) * 100));
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `进度: ${completed}/${total} (${percent}%)`;
}
function updateStatus(message, type) {
    const statusText = document.getElementById('statusText');
    let icon = 'fa-info-circle';
    let color = 'var(--gray)';
    
    switch (type) {
        case 'processing':
            icon = 'fa-sync fa-spin';
            color = 'var(--primary)';
            break;
        case 'success':
            icon = 'fa-check-circle';
            color = '#28a745';
            break;
        case 'warning':
            icon = 'fa-exclamation-triangle';
            color = '#ffc107';
            break;
        case 'error':
            icon = 'fa-times-circle';
            color = '#dc3545';
            break;
        case 'idle':
            icon = 'fa-circle-notch';
            color = 'var(--gray)';
            break;
    }
    
    statusText.innerHTML = `<i class="fas ${icon}" style="color: ${color}"></i> ${message}`;
}

// 导出JSON
function exportToJSON(data, filename = 'mx-records.json') {
    if (!data || data.length === 0) return;
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
}

// TIME
function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString('zh-CN');
}

function isValidDomain(domain) {
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    return domainRegex.test(domain);
}

// delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}