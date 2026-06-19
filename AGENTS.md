# AGENTS.md - 網頁簡報專案規則

## 專案目標

根據 `materials/` 中的資料文件，製作可透過 GitHub Pages 發布的靜態網頁簡報。

## 專案類型

靜態網頁專案。

## 工作原則

- 先讀現有文件，再修改或新增檔案。
- 保留使用者提供的原始資料，不直接改寫 `materials/` 中的原始檔。
- 將資料整理、簡報規劃、網頁製作、部署紀錄分開保存。
- 優先使用簡單、可維護的 HTML/CSS/JavaScript。
- 不加入框架、套件管理器或建置流程，除非使用者明確要求。
- 非必要不移動、刪除或重新命名既有檔案。

## 檔案放置規則

- `materials/`：放使用者提供的原始資料文件。
- `working/`：放資料摘要、簡報大綱、草稿與中間整理結果。
- `app/`：放靜態網頁簡報原始檔，例如 `index.html`、CSS、JavaScript。
- `assets/`：放簡報使用的圖片、字型、音訊、影片或其他媒體。
- `outputs/`：放可交付成果或匯出的版本。
- `references/`：放參考資料與外部連結整理。
- `scripts/`：放可重複使用的輔助腳本。
- `archive/`：放舊版、備份或不再主動使用的內容。

## 開工規則

使用者說「開工」時：

1. 讀取 `README.md`、`PROGRESS.md`、`TODO.md`、`DECISIONS.md`、`DEPLOYMENT.md`。
2. 檢查 `materials/` 是否已有原始資料。
3. 檢查 Git 與部署狀態。
4. 回報目前狀態與建議下一步，先不要改檔，除非使用者已明確要求。

## 收工規則

使用者說「收工」時：

1. 整理本輪完成內容。
2. 更新 `PROGRESS.md`。
3. 更新 `TODO.md`。
4. 若有重要選擇，更新 `DECISIONS.md`。
5. 若 GitHub、GitHub Pages 或環境設定有變動，更新 `DEPLOYMENT.md`。
6. 檢查 Git 狀態並回報。

## GitHub 與部署規則

- 使用者已表示需要 GitHub repo 與 GitHub Pages。
- 建立 GitHub repo 前，必須先確認 repo 名稱、public/private，以及是否立即 push。
- GitHub Pages 設定前，必須確認發布來源、分支與目錄。
- 不提交 `.env`、token、API key、私鑰、帳密或本機個人設定。

## Firebase 規則

目前不使用 Firebase。除非使用者明確要求，不建立 Firebase project、不新增 Firebase 設定、不部署 Firebase。

## 完成回報格式

非 trivial 工作完成時，回報：

- What changed
- What was verified
- What remains uncertain or was not run
