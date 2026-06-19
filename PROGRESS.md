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

## 2026-06-19 本地投票測試模式

已完成：

- 新增 `?pollMode=local` 本地測試模式。
- 本地模式使用瀏覽器 `localStorage` 模擬投票、改票與結果長條，不寫入 Firebase。
- 可用 `pollUser` query parameter 模擬不同參與者。

限制：

- 本地模式不驗證 Firestore 寫入、Anonymous Auth 或 Security Rules。
- 真實 Firebase 測試仍需 Firebase project 與 Web config。

## 2026-06-19 Firebase 專案建立

已完成：

- 安裝暫存 Firebase CLI：`%TEMP%\\htmlpresentation-firebase-tools`。
- 使用已登入帳號 `chunyi.lii@gmail.com` 建立 Firebase project：`htmlpresentation-soil`。
- 建立 Firebase Web App：`HTMLpresentation Web`。
- 將 Firebase Web config 填入 `app/index.html`。
- 透過 Firebase CLI 啟用 Firestore API、建立 default Firestore database，並部署 `firebase/firestore.rules`。
- 新增 `.firebaserc`，預設 project 指向 `htmlpresentation-soil`。

目前狀態：

- Anonymous Auth 已由使用者在 Firebase Console 啟用。
- 本地真實 Firebase 測試通過：等待 `已連線` 後可投票，改票會更新同一匿名使用者的選擇。
- 測試結果：第一選項投票後為 1 票；改投第二選項後第一選項回到 0 票，第二選項增加。

待完成：

- 修正後的按鈕事件代理已推送到 GitHub Pages。
- 公開頁真實投票寫入測試已通過。
- 公開頁測試結果：第一選項投票後可寫入；改投第二選項後，第一選項票數下降、第二選項票數上升；console 無錯誤。

## 2026-06-19 收工同步

已完成：

- 重新部署 Firebase Firestore rules 到 `htmlpresentation-soil`。
- Firebase CLI 回報 `firebase/firestore.rules` 編譯成功，且已 release 到 `cloud.firestore`。
- 檢查 GitHub Pages 狀態為 `built`。
- 檢查公開簡報頁投票狀態，Firebase 顯示「已連線，請選擇一個答案。」且 console 無錯誤。

目前狀態：

- GitHub Pages 前端已部署。
- Firebase Firestore rules 已部署。
- 真實 Firebase 投票功能可用。

下一步建議：

- 若要調整投票題目或選項，需同步更新 `app/index.html` 的 `POLLS` 與 `firebase/firestore.rules` 的合法選項清單。
- 調整後再次執行「收工並同步 GitHub，並部署 Firebase rules」。

## 2026-06-19 學員投票頁與目前題目同步

已完成：

- 新增 `app/vote.html` 作為手機優先的學員投票頁。
- 在三個投票投影片加入學員投票頁 QR Code 與網址。
- 講師簡報切到投票頁時，會同步寫入 `sessions/default.activePollId`；離開投票頁時清空目前題目。
- 學員投票頁會監聽 `activePollId`，只顯示講師目前開放的題目。
- 更新 `firebase/firestore.rules`，允許匿名使用者讀取與更新 `sessions/default.activePollId`，並限制合法 poll id。
- 新增 `scripts/static-server.cjs`，供本地驗證時啟動穩定的靜態服務。
- 更新 `scripts/verify-presentation.cjs`，加入 QR Code、學員頁、local activePollId 同步與手機 viewport 驗證。

驗證：

- 使用 `PRESENTATION_BASE_URL=http://127.0.0.1:8765 node scripts/verify-presentation.cjs` 驗證通過。
- 驗證內容包含：簡報可載入、投票按鈕可用、QR URL 存在、學員頁可顯示目前題目、學員可投票、講師離開投票頁後學員頁回到等待狀態、console 無錯誤。
- 已檢查 `outputs/presentation-preview-local-poll.png`，QR Code 加入後投票區與 takeaway 無重疊。
- 已檢查 `outputs/student-vote-preview.png`，學員頁等待狀態無殘留舊題目。

待完成：

- 將更新後的前端推送到 GitHub Pages。
- 部署更新後的 Firestore rules。已完成，Firebase CLI 回報 rules 已 release 到 `cloud.firestore`。
