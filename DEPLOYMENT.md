# DEPLOYMENT.md

## GitHub 狀態

- Repo：已建立
- Repo URL：https://github.com/chunyifish/HTMLpresentation
- Visibility：public
- Branch：main
- Remote：https://github.com/chunyifish/HTMLpresentation.git

## GitHub Pages 狀態

- 目標部署：GitHub Pages
- 部署狀態：已啟用，等待 GitHub Pages 建置完成
- 發布來源：main branch
- 發布目錄：root `/`
- Pages URL：https://chunyifish.github.io/HTMLpresentation/

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
- 最近公開測試截圖：`outputs/presentation-preview-public-firebase-live.png`
- 最近 Firestore rules 部署：2026-06-19，部署成功，rules 已 release 到 `cloud.firestore`
- 最近公開頁連線檢查：2026-06-19，投票狀態為「已連線，請選擇一個答案。」

## 環境變數

目前不需要 `.env`。Firebase Web config 需填入 `app/index.html` 的 `window.PRESENTATION_FIREBASE_CONFIG`。Firebase API key 可放在前端識別專案，但 Firestore 權限必須由 Security Rules 控制。

## 下一步

建立 GitHub repo 前需確認：

- Repo 名稱：`HTMLpresentation`
- Public 或 private：public
- 是否立即 push：已 push
- GitHub Pages 發布來源與目錄：main branch root `/`
