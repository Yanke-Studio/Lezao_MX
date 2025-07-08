# 贡献指南

感谢您对邮箱MX记录检测工具项目的关注！我们欢迎各种形式的贡献。

## 如何贡献

### 报告问题

如果您发现了bug或有功能建议，请：

1. 检查是否已有相关的issue
2. 如果没有，请创建新的issue
3. 提供详细的描述和重现步骤
4. 如果是bug，请包含浏览器版本和错误信息

### 提交代码

1. Fork这个仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

### 代码规范

#### JavaScript规范

- 使用ES6+语法
- 使用驼峰命名法
- 函数和变量名要有意义
- 添加必要的注释
- 保持代码简洁和可读性

```javascript
// 好的例子
function parseDomains(input) {
    return input.split(/[,;\s\n]+/)
        .map(domain => domain.trim().toLowerCase())
        .filter(domain => isValidDomain(domain));
}

// 避免这样
function pd(i) {
    return i.split(/[,;\s\n]+/).map(d=>d.trim().toLowerCase()).filter(d=>ivd(d));
}
```

#### CSS规范

- 使用CSS变量定义颜色和尺寸
- 保持选择器简洁
- 使用语义化的类名
- 遵循移动优先的响应式设计

```css
/* 好的例子 */
.btn-primary {
    background: var(--primary);
    color: white;
    padding: 12px 25px;
    border-radius: 8px;
}

/* 避免这样 */
.bp {
    background: #4361ee;
    color: #fff;
    padding: 12px 25px;
}
```

#### HTML规范

- 使用语义化标签
- 保持良好的缩进
- 添加必要的accessibility属性
- 确保标签正确闭合

### 测试

在提交代码前，请确保：

1. 在多个浏览器中测试功能
2. 检查响应式设计在不同设备上的表现
3. 验证所有DNS服务商都能正常工作
4. 测试错误处理和边界情况

### 文档

如果您的更改影响了用户界面或功能：

1. 更新README.md
2. 更新CHANGELOG.md
3. 如有必要，添加或更新注释

## 开发环境设置

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/username/mx-record-checker.git
cd mx-record-checker

# 启动本地服务器
python -m http.server 8080
# 或者
npx serve .
```





### 项目结构

```
mx-record-checker/
├── index.html              # 主页面
├── styles/                 # 样式文件
│   ├── main.css           # 主样式
│   └── components.css     # 组件样式
├── js/                    # JavaScript文件
│   ├── app.js            # 主应用逻辑
│   ├── dns-checker.js    # DNS检测功能
│   └── utils.js          # 工具函数
├── config/                # 配置文件
│   └── dns-providers.js  # DNS服务商配置
└── README.md             # 项目文档
```

## 功能建议

我们欢迎以下类型的贡献：

### 高优先级
- 性能优化
- 错误处理改进
- 用户体验提升
- 浏览器兼容性改进

### 中优先级
- 新的DNS服务商支持
- 更多导出格式
- 国际化支持
- 主题切换功能

### 低优先级
- 历史记录功能
- 域名收藏功能
- 高级过滤选项
- 统计分析功能

## 代码审查

所有的Pull Request都会经过代码审查：

1. 代码质量和规范检查
2. 功能测试验证
3. 性能影响评估
4. 文档完整性检查

## 社区准则

请遵循以下准则：

1. 保持友善和专业
2. 尊重不同的观点和经验
3. 专注于对项目最有利的事情
4. 展现同理心

## 许可证

通过贡献代码，您同意您的贡献将在MIT许可证下授权。

## 联系方式

如果您有任何问题，可以通过以下方式联系：

- 创建GitHub Issue
- 发送邮件到github@lz-s.cn

感谢您的贡献！