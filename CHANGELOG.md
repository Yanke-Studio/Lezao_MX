# 更新日志

所有重要的项目变更都会记录在这个文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 计划添加
- 支持更多DNS服务商
- 添加历史记录功能
- 支持导出更多格式
- 添加域名收藏功能

## [1.0.0] - 2023-12-XX

### 新增
- 邮箱MX记录批量检测功能
- 支持多种输入格式（逗号、分号、空格、换行分隔）
- 集成三个主要DNS服务商（Cloudflare、Google、Quad9）
- 实时进度显示和状态更新
- 检测结果JSON格式导出
- 响应式界面设计，支持移动端
- 快捷键支持（Ctrl+Enter开始检测）
- 示例域名快速填充功能
- 错误重试机制和超时控制
- 纯前端实现，无需后端服务

### 技术特性
- 使用DNS over HTTPS技术
- 现代JavaScript ES6+语法
- CSS Grid和Flexbox布局
- Font Awesome图标库集成
- 模块化代码结构
- 异步处理和并发控制

### 浏览器支持
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## [0.1.0] - 2023-12-XX

### 新增
- 项目初始化
- 基础HTML结构
- 核心CSS样式
- JavaScript功能框架