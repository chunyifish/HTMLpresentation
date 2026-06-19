# PROGRESS.md

## 2026-06-19 初始化

已完成：

- 建立專案核心文件：`README.md`、`AGENTS.md`、`INIT.md`、`PROGRESS.md`、`TODO.md`、`DECISIONS.md`、`DEPLOYMENT.md`。
- 建立標準資料夾：`materials/`、`working/`、`outputs/`、`assets/`、`references/`、`scripts/`、`app/`、`firebase/`、`archive/`。
- 記錄專案類型為靜態網頁。
- 記錄目標部署方式為 GitHub Pages。
- 記錄目前不使用 Firebase。

尚未完成：

- 尚未放入原始資料文件。
- 尚未建立靜態網頁簡報。
- 尚未建立 GitHub repo。
- 尚未設定 GitHub Pages。

目前狀態：

專案工作區已可接續。下一步應先放入資料文件，或確認 GitHub repo 名稱與公開狀態。

## 2026-06-19 簡報內容匯入與逐頁規劃

已完成：

- 將使用者提供的簡報全文保存為 `materials/soil-ai-autonomous-learning-source.txt`。
- 依內容建立 12 頁網頁簡報逐頁規劃：`working/slide-plan.md`。
- 暫停在規劃確認階段，尚未產出正式網頁簡報。

目前狀態：

等待使用者確認頁數、受眾方向與逐頁結構後，再製作 `app/index.html`。

## 2026-06-19 HTML 簡報初版

已完成：

- 使用者確認 12 頁架構可行。
- 確認受眾方向為「教師研習」。
- 確認風格為「教師研習實用」。
- 建立 `app/index.html` 單檔靜態網頁簡報初版。

目前狀態：

等待本地端預覽與視覺檢查後，再依需要修正版面或內容。

本地端狀態：

- 已啟動 `http://127.0.0.1:8000/`。
- 已確認本地端 HTTP 回應正常。
- 初次自動瀏覽器截圖驗證曾因內建 Playwright 套件缺少 `playwright-core` 未完成；後續已補強並驗證成功。

## 2026-06-19 Playwright 驗證工具補強

已完成：

- 使用 npm 嘗試在專案路徑安裝 `playwright-core`，但 Google Drive 同步路徑造成套件解壓不完整。
- 改將 `playwright-core` 安裝至本機暫存工具資料夾 `%TEMP%\\htmlpresentation-playwright-tools`，並驗證可載入。
- 新增 `scripts/verify-presentation.cjs`，使用暫存工具資料夾中的 `playwright-core` 控制本機 Edge。
- 已成功驗證簡報第 1 頁、第 2 頁與下一頁按鈕。
- 已輸出預覽截圖：`outputs/presentation-preview.png`。

目前狀態：

Playwright-based 本地驗證已可執行。專案內不保留損壞的 `node_modules`、`package.json` 或 `package-lock.json`。

## 2026-06-19 GitHub 上傳準備

已完成：

- 新增根目錄 `index.html`，讓 GitHub Pages 使用 root `/` 發布時可自動導向 `app/` 簡報。
- 更新 `DEPLOYMENT.md`，將 GitHub Pages 發布來源記錄為 main branch root `/`。

目前狀態：

準備初始化 Git repo、建立 GitHub repo 並推送。

## 2026-06-19 GitHub 上傳與 Pages 啟用

已完成：

- 初始化 Git repo，主分支為 `main`。
- 建立 root commit：`7f5d669 Initialize web presentation project`。
- 建立公開 GitHub repo：https://github.com/chunyifish/HTMLpresentation
- 推送 `main` 到 `origin/main`。
- 啟用 GitHub Pages，發布來源為 `main` branch root `/`。
- Pages URL：https://chunyifish.github.io/HTMLpresentation/

目前狀態：

等待 GitHub Pages 建置完成後，可開啟 Pages URL 檢查公開頁面。

公開檢查：

- Repo URL 已回應 200：https://github.com/chunyifish/HTMLpresentation
- Pages root 已回應 200：https://chunyifish.github.io/HTMLpresentation/
- Pages app 已回應 200：https://chunyifish.github.io/HTMLpresentation/app/
- GitHub Pages API 查詢時狀態仍顯示 `building`，但公開頁面已可讀取。

## 2026-06-19 Firebase 互動投票第一版

已完成：

- 在第 1、3、10 頁加入現場投票 UI。
- 投票功能保持靜態 HTML 架構，不加入 React/Vite/npm build。
- 新增 Firebase Web config placeholder；未填設定時投票會停用並顯示提示，不影響簡報翻頁。
- 新增 Firestore rules：公開讀取、匿名使用者只能寫自己的 vote document、禁止前端改題目。
- 新增 `firebase/README.md` 說明 Firebase 服務與資料模型。

尚未完成：

- 尚未填入 Firebase project id 與 Web config。
- 尚未在 Firebase Console 啟用 Anonymous Auth、建立 Firestore、部署 rules。
- 尚未在公開 GitHub Pages 進行真實投票寫入測試。

本地驗證：

- Playwright 驗證通過：3 個投票區存在、未設定 Firebase 時 12 個投票按鈕停用、console 無錯誤。
- 第 1、3、10 頁投票區均未超出 16:9 投影片邊界。
