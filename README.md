# PSH

> 📖 [English Version](https://github.com/clapppp/psh/blob/main/README.md)

**PSH**는 실험적인 웹 서비스들을 위한 **개인 웹 플랫폼 플레이그라운드**입니다.  
다양한 인터랙티브 웹 아이디어를 설계하고, 테스트하고, 발전시키는 공간입니다.

## 스크린샷

[![Screenshot](https://github.com/clapppp/psh/raw/main/.github/images/psh_screenshot.png)](https://github.com/clapppp/psh/blob/main/.github/images/psh_screenshot.png)

<http://168.107.4.85:3000/>

## 아키텍처

[![Architecture](https://github.com/clapppp/psh/raw/main/.github/images/psh_architecture.png)](https://github.com/clapppp/psh/blob/main/.github/images/psh_architecture.png)

- **Next.js**를 선택한 이유는 프론트엔드와 서버 사이드 로직을 하나의 풀스택 프레임워크 안에서 구성할 수 있기 때문입니다.
- 프로젝트에 실시간 통신을 위한 전용 **WebSocket 서버**가 필요했기 때문에 **커스텀 서버**를 도입했습니다.
- **Three.js**는 브라우저에서 직접 3D 그래픽을 렌더링하기 위해 사용했습니다.

## 배운 점

- **커스텀 서버** 아키텍처를 적용하면서 **Next.js**에 대한 이해를 심화했습니다.
- **Node.js**에서 **WebSocket 서버**를 이용한 실시간 통신 구현 방법을 익혔습니다.
- **Three.js**를 활용한 브라우저 기반 **3D 렌더링**에 대한 실전 경험을 쌓았습니다.

## 실행 방법

```bash
git clone https://github.com/clapppp/psh.git
cd psh/psh
npm ci
npm run dev
```
