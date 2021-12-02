# Github-zcl-labels

> A nodejs app that turns labels into the template of projects in ZeroClassLab!

## Usage

```bash
git clone https://github.com/zerosheepmoo/github-zcl-labels.git
cd ./github-zcl-labels
yarn
```

- create `.env` at root dir.

```dotenv
TOKEN=YOUR_GITHUB_TOKEN
OWNER=YOUR_ACCOUNT_NAME_OR_ORGANIZATION_NAME
REPO=YOUR_REPO
```

- run

```bash
node index.js
```

## 한국어 설명

- 레이블들을 ZeroClassLab 에서 진행하는 프로젝트들의 템플릿으로 바꾸어주는 노드 앱!

### 사용법

> package manager 로 `yarn` 을 사용합니다. 없다면 설치해주세요.

```bash
git clone https://github.com/zerosheepmoo/github-zcl-labels.git
cd ./github-zcl-labels
yarn
```

- 프로젝트 루트에 다음과 같이 `.env` 파일을 생성해주세요.

```dotenv
TOKEN=YOUR_GITHUB_TOKEN
OWNER=YOUR_ACCOUNT_NAME_OR_ORGANIZATION_NAME
REPO=YOUR_REPO
```

- 실행하기

```bash
node index.js
```
