# 網頁簡報

## 專案目標

根據後續放入 `materials/` 的資料文件，製作可在瀏覽器閱讀與展示的靜態網頁簡報。

## 使用對象

- 需要整理資料文件並轉成簡報的人。
- 後續接手製作、修訂或部署網頁簡報的 Codex 對話。
- 需要透過 GitHub Pages 發布簡報的協作者或觀看者。

## 專案類型

靜態網頁專案。

## 專案結構

```text
.
├─ AGENTS.md        # Codex 專案工作規則
├─ README.md        # 專案說明
├─ INIT.md          # 初始化資訊與接續指引
├─ PROGRESS.md      # 進度與交接紀錄
├─ TODO.md          # 待辦與待確認
├─ DECISIONS.md     # 重要決策
├─ DEPLOYMENT.md    # GitHub Pages 與部署狀態
├─ materials/       # 原始資料文件
├─ working/         # 草稿、整理中內容
├─ outputs/         # 產出的簡報檔案
├─ assets/          # 圖片、字型、媒體素材
├─ references/      # 參考資料
├─ scripts/         # 輔助腳本
├─ app/             # 靜態網頁原始檔
├─ firebase/        # 目前不使用，保留狀態說明
└─ archive/         # 歸檔資料
```

## 目前狀態

已完成可接續專案工作區初始化。尚未放入原始資料文件，尚未建立 GitHub repo，尚未部署到 GitHub Pages。

## 如何接續工作

1. 將資料文件放入 `materials/`。
2. 請 Codex 先讀取 `AGENTS.md`、`PROGRESS.md`、`TODO.md`、`DECISIONS.md`、`DEPLOYMENT.md`。
3. 根據資料文件整理簡報架構。
4. 在 `app/` 製作靜態網頁簡報。
5. 確認 GitHub repo 名稱與公開狀態後，再設定 GitHub Pages。
