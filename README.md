# 邮箱MX记录检测工具

一个纯前端的邮箱MX记录检测工具，支持批量查询，使用DNS over HTTPS技术，无需后端服务。

你可以打开 https://www.lz-s.cn/share/mx  查看部署示例。

## 功能特性

- 批量检测邮箱后缀的MX记录
- 支持多种输入格式（逗号、分号、空格、换行分隔）
- 使用DNS over HTTPS技术，支持多个DNS服务商
- 实时显示检测进度和状态
- 支持结果导出为JSON格式
- 响应式设计，支持移动端访问
- 纯前端实现，无需服务器部署

## 支持的DNS服务商

- Cloudflare DNS (优先使用)
- Google DNS
- Quad9 DNS

## 使用方法

1. 在输入框中输入要检测的邮箱后缀
2. 多个域名可以用逗号、分号、空格或换行分隔
3. 点击"检测MX记录"按钮开始检测
4. 查看检测结果，可以导出为JSON文件
5. 使用"清除结果"按钮重置所有数据

## 快捷键

- `Ctrl + Enter`: 开始检测MX记录

## 项目结构

```
mx-record-checker/
├── index.html              # 主页面文件
├── styles/                 # 样式文件目录
│   ├── main.css           # 主要样式
│   └── components.css     # 组件样式
├── js/                    # JavaScript文件目录
│   ├── app.js            # 主应用逻辑
│   ├── dns-checker.js    # DNS检测核心功能
│   └── utils.js          # 工具函数
├── config/                # 配置文件目录
│   └── dns-providers.js  # DNS服务商配置
└── README.md             # 项目说明文档
```

## 技术实现

### 前端技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- Font Awesome 图标库
- CSS Grid 和 Flexbox 布局
- CSS 变量和现代CSS特性

### 核心技术

- **DNS over HTTPS**: 使用HTTPS协议进行DNS查询，避免传统DNS查询的限制
- **异步处理**: 使用Promise和async/await处理异步DNS查询
- **批量处理**: 支持同时检测多个域名，提高效率
- **错误重试**: 内置重试机制，提高查询成功率
- **超时控制**: 使用AbortController控制请求超时

### DNS查询流程

1. 解析用户输入的域名列表
2. 验证域名格式的有效性
3. 按批次并发查询MX记录
4. 尝试多个DNS服务商确保可用性
5. 实时更新查询进度和结果
6. 支持结果导出和数据持久化

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 部署说明

### 本地部署

1. 克隆或下载项目文件
2. 使用任意HTTP服务器托管文件
3. 访问index.html即可使用

### 静态网站部署

支持部署到任何静态网站托管服务：

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- 阿里云OSS
- 腾讯云COS

### 部署步骤

1. 将所有文件上传到静态托管服务
2. 确保index.html为根目录文件
3. 配置HTTPS访问（推荐）
4. 测试所有功能正常工作

## 开发说明

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd mx-record-checker

# 启动本地服务器（可选择任一方式）
python -m http.server 8080
# 或
npx serve .
# 或
php -S localhost:8080
```

### 代码结构说明

- `config/dns-providers.js`: DNS服务商配置，可以添加新的服务商
- `js/utils.js`: 通用工具函数，包含域名解析、进度更新等
- `js/dns-checker.js`: DNS检测核心类，处理MX记录查询逻辑
- `js/app.js`: 主应用类，处理用户交互和界面更新
- `styles/main.css`: 主要样式，包含布局和基础样式
- `styles/components.css`: 组件样式，包含按钮、表格、状态等样式

### 自定义配置

可以通过修改`config/dns-providers.js`文件来：

- 添加新的DNS服务商
- 调整服务商优先级
- 修改超时时间和重试次数

## 注意事项

1. **网络要求**: 需要能够访问DNS over HTTPS服务
2. **CORS限制**: 某些DNS服务商可能有CORS限制
3. **查询频率**: 避免过于频繁的查询请求
4. **结果准确性**: 检测结果仅供参考，实际配置可能有差异

## 常见问题

### Q: 为什么某些域名检测失败？

A: 可能的原因包括：
- 域名不存在或配置错误
- DNS服务商暂时不可用
- 网络连接问题
- 域名没有配置MX记录

### Q: 如何添加新的DNS服务商？

A: 编辑`config/dns-providers.js`文件，按照现有格式添加新的服务商配置。

### Q: 支持IPv6的MX记录吗？

A: 当前版本主要检测标准MX记录，IPv6支持取决于DNS服务商。

## 更新日志

### v1.0.0 (2025-07-08)

- 初始版本发布
- 支持批量MX记录检测
- 多DNS服务商支持
- 响应式界面设计
- 结果导出功能

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 联系方式

如有问题或建议，请通过GitHub Issues联系。