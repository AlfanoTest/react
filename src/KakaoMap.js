import React, { useEffect, useState } from 'react';

const { kakao } = window;

const KakaoMap = () => {  // 배포 하고 싶어
  const [map, setMap] = useState(null);   // 카카오 맵 객체
  const [positions, setPositions] = useState([]);   // 이동 경로를 저장할 배열
  const [tracking, setTracking] = useState(false);  // 추적 상태

  useEffect(() => {
    // 초기 맵 설정 (현재 위치)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;   // 위도
        const lon = position.coords.longitude;  // 경도

        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(lat, lon),  // 현재 위치로 맵의 중심 설정
          level: 3
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);

        // 처음 위치에 마커 추가
        const markerPosition  = new kakao.maps.LatLng(lat, lon); 
        const marker = new kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(newMap);
      });
    } else {
      console.log("Geolocation을 사용할 수 없습니다.");
    }
  }, []);

  const startTracking = () => {
    if (navigator.geolocation) {
      setTracking(true);
      navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const newPos = new kakao.maps.LatLng(lat, lon);

        setPositions((prev) => [...prev, newPos]);  // 좌표 추가
      });
    }
  };

  const stopTracking = () => {
    setTracking(false);

    // 이동 경로를 선으로 그립니다.
    const polyline = new kakao.maps.Polyline({
      path: positions,  // 경로 설정
      strokeWeight: 5, // 선의 두께
      strokeColor: '#FF0000', // 선의 색깔
      strokeOpacity: 0.8, // 선의 투명도
      strokeStyle: 'solid' // 선의 스타일
    });
    polyline.setMap(map);  // 맵에 선을 표시
  };

  return (
    <div>
      <h2>카카오 맵</h2>
      <div id="map" style={{ width: '500px', height: '500px' }}></div>
      <button onClick={startTracking} disabled={tracking}>시작</button>
      <button onClick={stopTracking} disabled={!tracking}>종료</button>
    </div>
  );
};

export default KakaoMap;
