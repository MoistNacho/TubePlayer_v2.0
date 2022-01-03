# TubePlayer

> 기존의 React-TubePlayer 프로젝트를 새롭게 리뉴얼하였습니다.

1. 전체적인 UI/UX 디자인을 개선하였고, 리액트 라우터를 사용하여 페이지를 세분화 하였습니다.
2. 기존에는 고정된 수량의 비디오만 불러왔었지만 지금은 리스트를 스크롤 함에 따라 추가적으로 비디오가 fetch 되도록 하였습니다.
3. 메인 페이지에서는 리스트 아이템에 마우스를 호버할 경우 약간의 시간이 경과한 후 비디오 프리뷰 영상을 시청할 수 있도록 하였습니다.
4. 동영상 찜하기 기능을 추가하여 리스트 아이템의 하트 모양을 클릭시 로컬스토리지에 해당 비디오를 저장합니다. 상단 헤더의 saved 버튼으로 찜목록을 확인 가능합니다.
5. 단순했던 영상 상세보기 페이지를 유튜브와 비슷한 디자인으로 전반적으로 수정하였습니다.

Demo : https://moistnacho.github.io/React-TubePlayer/

## Tools

- React
- React Context
- React Router
- React Infinite-Scroll
- axios
- Youtube API
- PostCSS

<!-- ## Windows Preview

![TP1](https://user-images.githubusercontent.com/59498305/102708351-d39a9780-42e5-11eb-9a53-ff6dbffa23ac.PNG)

![TP2](https://user-images.githubusercontent.com/59498305/102708452-8d920380-42e6-11eb-8c44-3eaf80359bc1.PNG)

![TP3](https://user-images.githubusercontent.com/59498305/102708453-8ec33080-42e6-11eb-95a3-05cb61a1b9e6.PNG)

## Mobile Preview

![TP4](https://user-images.githubusercontent.com/59498305/102708444-84a13200-42e6-11eb-9637-59cb3f2ef4f5.PNG)

![TP5](https://user-images.githubusercontent.com/59498305/102708447-8539c880-42e6-11eb-9ef7-114686913b62.PNG) -->
