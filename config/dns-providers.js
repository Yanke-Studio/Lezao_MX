// DNS服务商配置 欢迎持续添加
const DNS_PROVIDERS = [
    {
        id: 'cloudflare',
        name: 'Cloudflare DNS',
        url: 'https://cloudflare-dns.com/dns-query',
        active: true,
        priority: 1
    },
    {
        id: 'google', 
        name: 'Google DNS',
        url: 'https://dns.google/resolve',
        active: true,
        priority: 2
    },
    {
        id: 'quad9',
        name: 'Quad9 DNS', 
        url: 'https://dns.quad9.net:5053/dns-query',
        active: true,
        priority: 3
    }
];

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DNS_PROVIDERS;
} else {
    window.DNS_PROVIDERS = DNS_PROVIDERS;
}