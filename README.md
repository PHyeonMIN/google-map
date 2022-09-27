# 1. google-map API 정리
![image](https://user-images.githubusercontent.com/94040224/192454972-bf07b50c-aebc-4cc8-b068-59beea9d18c4.png)
+ 한달에 $200는 무료입니다. ( $200 이상 사용시 요금 청구 )
+ 가격 책정 사이트 : https://mapsplatform.google.com/pricing/?hl=ko
+ 다른지도보다 검색 자동완성(AutoComplete) 부분은 지원을 잘해주는 거 같습니다.

# 2. 구현 기능
### 1. 위치에 따른 주소 변경
![기능1_위치에따른 주소변경](https://user-images.githubusercontent.com/94040224/192455547-9327d653-cff6-4d06-b6d9-ac003340db1a.gif)

### 2. 검색 시 마커생성 및 지도중앙정렬
![기능2_검색시 마커 센터](https://user-images.githubusercontent.com/94040224/192455907-bac9d7fc-f137-4f13-a7c5-bbf11b8bab47.gif)

### 3. 길찾기 기능  
![기능3_길찾기](https://user-images.githubusercontent.com/94040224/192456019-312aa6f6-977d-45f9-b6c6-2253fdcceb76.gif)


# 3. 시행착오
+ 시작 시 react-google-map API가 있어서 사용
  + 검색자동완성(AutoComplete) 기능에 좌표값이나 place_id를 가져오는 기능이 없음
  + 또한 기타 등등 이해할 수 없는 에러 발생  
→ react-google-map API 가 아닌 기존 공홈 docs를 참조
------------
![image](https://user-images.githubusercontent.com/94040224/192457715-0fa07f41-3a79-482c-9e0f-ea4cce17fdd0.png)
+ google-map 라이브러리가 페이지렌더링보다 늦게 적용되는 경우 발생
  + 시간상의 문제로 setTimeout으로 라이브러리를 먼저 렌더링 후에 페이지 렌더링하도록 적용
  + setTimeout은 최후의 보류나 다름 없음.
  + 이 프로젝트는 next프로젝트이기에 google 객체를 서버사이드 렌더링한다면 해결할 수 있다고 생각함 ( 적용은 시간상 보류 )
------------
+ 빠른 구현으로 인한 props 사용
  + redux를 사용했다면 더욱 깔끔한 구조와 빠른 기능을 구현을 했을 것!

# 4. 기타 참조
1. google-map 콘솔 : https://console.cloud.google.com/google/maps-apis/api-list?project=rich-synapse-363405
2. google-map sample code : https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-directions?hl=ko
3. google-map 가격책정 : https://mapsplatform.google.com/pricing/?hl=ko
4. direction 기능 관련 영상 : https://www.youtube.com/watch?v=iP3DnhCUIsE
5. google-map tutorial 영상 : https://www.youtube.com/watch?v=Alz13kGluL8&t=2607s
6. react-google-map docs : https://react-google-maps-api-docs.netlify.app/#section-introduction
