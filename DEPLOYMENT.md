# DEPLOYMENT.md

## GitHub 狀態

- Repo：已建立
- Repo URL：https://github.com/chunyifish/HTMLpresentation
- Visibility：public
- Branch：main
- Remote：https://github.com/chunyifish/HTMLpresentation.git

## GitHub Pages 狀態

- 目標部署：GitHub Pages
- 部署狀態：已啟用，最近建置狀態為 `built`
- 發布來源：main branch
- 發布目錄：root `/`
- Pages URL：https://chunyifish.github.io/HTMLpresentation/
- 最近部署 commit：`7b9dca6 Refine selection and closing slides`
- 最近部署日期：2026-06-21

## Firebase 狀態

- Firebase：已建立 project，真實投票寫入已在本地與公開頁驗證
- Project ID：htmlpresentation-soil
- Firestore：已建立 default database，location `nam5`，rules 已部署
- Storage：不使用
- Auth：Anonymous Auth 已啟用
- Functions：不使用

## Firebase Console

- Project Console：https://console.firebase.google.com/project/htmlpresentation-soil/overview
- Authentication 設定：https://console.firebase.google.com/project/htmlpresentation-soil/authentication/providers

## Firebase 驗證

- 本地真實 Firebase 投票：通過
- GitHub Pages 真實 Firebase 投票：通過
- 改票更新同一匿名使用者 vote：通過
- 學員投票頁與目前題目同步：本地與公開頁驗證通過，使用者確認測試正常；Firestore rules 已部署，測試資料已清空
- 最近公開測試截圖：`outputs/presentation-preview-public-firebase-live.png`
- 最近 Firestore rules 部署：2026-06-21，規則已是最新版並 release 到 `cloud.firestore`
- 最近公開頁連線檢查：2026-06-19，投票狀態為「已連線，請選擇一個答案。」
- 最近公開頁部署檢查：2026-06-20，簡報與學員投票頁均回應 200，公開 HTML 已包含新版投票版面。
- 投票資料狀態：2026-06-20 已清除 `sessions/default` 與三個 votes 集合；原始 REST 回應均為空集合 `{}`。
- 最近版面部署檢查：2026-06-21，公開頁回應 200，已包含第 5 頁四階段流程與第 12 頁雙欄結論。

## 環境變數

目前不需要 `.env`。Firebase Web config 需填入 `app/index.html` 的 `window.PRESENTATION_FIREBASE_CONFIG`。Firebase API key 可放在前端識別專案，但 Firestore 權限必須由 Security Rules 控制。

## 下一步

建立 GitHub repo 前需確認：

- Repo 名稱：`HTMLpresentation`
- Public 或 private：public
- 是否立即 push：已 push
- GitHub Pages 發布來源與目錄：main branch root `/`
