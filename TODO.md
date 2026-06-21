# TODO.md

## 下一步

- [x] 將資料文件放入 `materials/`。
- [x] 根據資料文件整理簡報主題、受眾與頁面大綱。
- [x] 確認 `working/slide-plan.md` 的 12 頁結構。
- [x] 在 `app/` 建立靜態網頁簡報初版。
- [x] 使用 Playwright 檢查本地端預覽可載入與翻頁。
- [x] 加入 Firebase 互動投票 UI 與 Firestore rules。
- [x] 檢查投票區在 16:9 投影片內不溢出。
- [x] 加入 `?pollMode=local` 本地投票測試模式。
- [x] 人工檢查本地端預覽版面。
- [x] 建立或提供 Firebase project。
- [x] 啟用 Anonymous Auth。
- [x] 建立 Firestore。
- [x] 填入 Firebase Web config。
- [x] 部署 Firestore rules。
- [x] 在公開頁測試真實投票寫入與即時結果。
- [x] 收工時重新部署 Firebase rules。
- [x] 新增學員投票頁、簡報 QR Code 與目前開放題目同步。
- [x] 放大講師頁投票文字並改為 2×2 結果卡。
- [x] 修正直接開啟 HTML 時 QR 區顯示本機長路徑造成的溢出。
- [x] 將新版投票版面發布至 GitHub Pages，並重新 release Firestore rules。
- [x] 清空正式 Firebase 投票與目前開放題目資料。
- [x] 將第 5 頁改為橫向四階段選取流程。
- [x] 將第 12 頁改為「不是／而是」雙欄結論版面。
- [x] 發布第 5、12 頁新版面至 GitHub Pages，並重新 release Firestore rules。
- [x] 實作投票數邏輯重設功能 (Logical Reset)，包含前端 UI Hover 重新計票按鈕。
- [x] 部署更新後的 Firestore Rules，限制 resetTimestamp 與 updatedAt。
- [x] 擴充 verify-presentation.cjs，完成本地邏輯重設的端到端自動化驗證。
- [x] 將新版邏輯重設功能推送到 GitHub Pages。

## 下次優先

- [x] 確認 GitHub repo 名稱。
- [x] 確認 GitHub repo 要設為 public 或 private。
- [x] 確認是否要立即 push 到 GitHub。
- [x] 確認 GitHub Pages 的發布分支與目錄。
- [x] 建立 GitHub repo 並 push。
- [x] 啟用 GitHub Pages。
- [x] 檢查 GitHub Pages 公開網址。

## 待確認

- [ ] 資料文件格式與來源。
- [x] 簡報語言、視覺風格與目標觀眾。
- [ ] 是否需要手機版閱讀體驗。
- [x] 學員投票頁需支援手機操作。
- [ ] 是否需要列印版或 PDF 匯出。
- [ ] 是否要加入互動題、課堂任務或講者備註。
- [ ] 正式研習前是否要執行講師裝置與手機的現場網路冒煙測試。
- [x] 是否提交目前四份交接文件並處理未追蹤除錯截圖。
