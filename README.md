# 语音转文字应用 (STT Demo)

这是一个使用React和Python FastAPI构建的语音转文字应用，利用OpenAI的Whisper模型进行语音识别。

## 项目结构

```
stt-demo/
├── client/             # React前端
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       ├── index.css
│       ├── reportWebVitals.js
│       └── components/
│           ├── ASRTest.js
│           └── ASRTest.css
└── server/             # Python FastAPI后端
    ├── main.py
    └── requirements.txt
```

## 安装与运行

### 环境
   ```bash
brew upgrade ffmpeg
   ```

### 前端 (Client)

1. 进入client目录：
   ```bash
   cd client
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm start
   ```
   前端将在 http://localhost:3000 运行

### 后端 (Server)

1. 进入server目录：
   ```bash
   cd server
   ```

2. 创建并激活虚拟环境（推荐）：
   ```bash
   python3 -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

4. 启动服务器：
   ```bash
   python main.py
   ```
   后端将在 http://localhost:8000 运行

## 使用方法

1. 打开浏览器访问 http://localhost:3000
2. 点击"开始录制"按钮并允许麦克风访问权限
3. 说话后点击"停止录制"
4. 点击"转换"按钮将录音发送到服务器进行语音识别
5. 识别结果将显示在页面上

## 注意事项

- 确保后端服务器正在运行，否则转换功能将无法工作
- 首次加载Whisper模型可能需要一些时间
- 默认使用的是Whisper的"base"模型，可以在server/main.py中修改为其他模型大小

## 技术栈

- 前端：React, RecordRTC
- 后端：FastAPI, Whisper, Uvicorn

