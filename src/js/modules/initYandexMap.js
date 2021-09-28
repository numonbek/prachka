/* eslint-disable */
import { throttle } from "./helpers";

const { ymaps } = window;
let mapMainInstance;

function initMapMain() {
  const mapElement = document.getElementById("map-main");
  if (!mapElement) return;
  if (mapMainInstance) return;

  const inpSuggest = $("#suggest-input input");
  const errElementSuggest = $("#suggest-input .input-validation__message");
  // eslint-disable-next-line no-unused-vars
  const suggestView = new ymaps.SuggestView(inpSuggest[0], {
    container: $("#suggest-input")[0],
  });
  const showError = (message) => {
    if (message) {
      errElementSuggest.html(
        `<span id="search-error" class="input-validation input-validation--invalid">${message}</span>`
      );
    } else {
      errElementSuggest.html("");
    }
  };
  const geocode = () => {
    // Забираем запрос из поля ввода.
    const request = inpSuggest.val();
    // Геокодируем введённые данные.
    ymaps.geocode(request).then(
      (res) => {
        const obj = res.geoObjects.get(0);
        let isValid = false;

        if (obj) {
          // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
          if (
            obj.properties.get(
              "metaDataProperty.GeocoderMetaData.precision"
            ) !== "exact"
          ) {
            isValid = true;
          }
        } else {
          isValid = true;
        }

        // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
        if (isValid) {
          showError("Неточный адрес, требуется уточнение");
          return;
        }

        showError("");

        const objCoord = obj.geometry.getCoordinates();
        mapMainInstance.setCenter(objCoord, 14);
      },
      (e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    );
  };
  inpSuggest.on(
    "change",
    throttle(() => {
      geocode();
    }, 333)
  );

  mapMainInstance = new ymaps.Map(mapElement, {
    center: [43.585472, 39.723098], // Сочи
    zoom: 5,
    controls: ["fullscreenControl", "geolocationControl", "zoomControl"],
  });

  const placemark = new ymaps.Placemark(
    [43.585472, 39.723089],
    {},
    {
      iconColor: "#303FF0",
    }
  );
  mapMainInstance.geoObjects.add(placemark);

  const location = ymaps.geolocation.get({
    mapStateAutoApply: true,
  });
  location.then(
    (result) => {
      // const userAddress = result.geoObjects.get(0).properties.get('text');
      const userCoordinates = result.geoObjects
        .get(0)
        .geometry.getCoordinates();

      placemark.geometry.setCoordinates(userCoordinates);
      mapMainInstance.setCenter(userCoordinates);

      ymaps
        .geocode(userCoordinates, { results: 1, kind: "house" })
        .then((res) => {
          const obj = res.geoObjects.get(0);
          const address = obj.getAddressLine();
          inpSuggest.val(address || "");
        });
    },
    (err) => {
      // eslint-disable-next-line no-console
      console.log(`Ошибка: ${err}`);
    }
  );

  const fixedCenterPlacemark = () => {
    const currentState = mapMainInstance.action.getCurrentState();
    const geoCenter = mapMainInstance.options
      .get("projection")
      .fromGlobalPixels(currentState.globalPixelCenter, currentState.zoom);
    placemark.geometry.setCoordinates(geoCenter);
  };

  mapMainInstance.events.add("actiontick", fixedCenterPlacemark);
  mapMainInstance.events.add("boundschange", fixedCenterPlacemark);

  mapMainInstance.events.add("actionend", () => {
    ymaps
      .geocode(mapMainInstance.getCenter(), { results: 1, kind: "house" })
      .then((res) => {
        const obj = res.geoObjects.get(0);
        const address = obj.getAddressLine();
        inpSuggest.val(address);
      });
  });

  document.addEventListener("click", (e) => {
    const btnYandexSubmit = e.target.closest("[data-yandex-submit]");
    if (!btnYandexSubmit) return;

    const inputs = document.querySelectorAll("[data-yandex-input]");
    inputs.forEach((inp) => {
      // eslint-disable-next-line no-param-reassign
      inp.value = inpSuggest.val() || "";
    });

    const fancyboxInstance = $.fancybox.getInstance();
    if (fancyboxInstance) {
      fancyboxInstance.close();
    }
  });
}

function initYandexMap() {}

function initTestMap() {
  const mapElement = document.getElementById("map-test");
  if (!mapElement) return;

  console.log(mapElement);

  const mapMainInstance = new ymaps.Map(mapElement, {
    center: [43.585472, 39.723098], // Сочи
    zoom: 4,
    controls: ["fullscreenControl", "geolocationControl", "zoomControl"],
  });

  // Создаем инстанцию геометрии многоугольника (указываем координаты вершин контуров).
  const polygonGeometry = new ymaps.Polygon(
    [
      // Внешний контур.
      // The coordinates of the vertices of the external contour.
      [
        [43.606271, 39.706401],
        [43.594228, 39.709047],
        [43.583826, 39.713204],
        [43.574038, 39.722936],
        [43.562537, 39.749392],
        [43.550486, 39.772446],
        [43.546103, 39.781895],
        [43.539254, 39.804193],
        [43.563515, 39.791138],
        [43.598977, 39.777071],
        [43.62057, 39.762441],
        [43.649077, 39.756814],
        [43.659254, 39.742185],
        [43.648669, 39.727555],
        [43.642969, 39.715739],
        [43.643376, 39.668474],
        [43.635639, 39.68029],
        [43.628716, 39.692669],
        [43.62057, 39.699984],
        [43.606719, 39.706173],
      ],
    ],
    { iconContent: "Lorem", hintContent: "500 руб" },
    {
      fillColor: "#b72dfc",
      // Делаем полигон прозрачным для событий карты.
      interactivityModel: "default#transparent",
      strokeWidth: 4,
      strokeColor: "#700b9c",
      opacity: 0.4,
    }
  );

  const polygonGeometry2 = new ymaps.Polygon(
    [
      // Внешний контур.
      // The coordinates of the vertices of the external contour.
      [
        [43.56874293884957, 39.731099963366034],
        [43.556116332700775, 39.76674203241495],
        [43.57938674039443, 39.773317244123945],
        [43.58710414252331, 39.761593751680834],
        [43.604599466018286, 39.75723750483991],
        [43.6189360962757, 39.7643659005212],
        [43.62581645830572, 39.76080168757346],
        [43.62667644682681, 39.74773294705068],
        [43.61864939060085, 39.73228804441999],
        [43.6231640115588, 39.71969827276649],
        [43.614030524334275, 39.70340227392305],
        [43.59284087247517, 39.710902796947806],
        [43.58079310584646, 39.716447124842716],
        [43.57275992545366, 39.72674371652511],
        [43.5696037434658, 39.7314960105268],
        [43.5684559939464, 39.731099963366034],
      ],
    ],
    { iconContent: "Lorem", hintContent: "300 руб" },
    {
      fillColor: "#2b82cb",
      // Делаем полигон прозрачным для событий карты.
      interactivityModel: "default#transparent",
      strokeWidth: 4,
      strokeColor: "#1679c4",
      opacity: 0.6,
    }
  );
  const polygonGeometry3 = new ymaps.Polygon(
    [
      // Внешний контур.
      // The coordinates of the vertices of the external contour.
      [
        [43.58451726520659, 39.73498080139109],
        [43.572726668802666, 39.72777299161544],
        [43.56952596953102, 39.73149314978295],
        [43.56716743243334, 39.736143351927126],
        [43.56598814853236, 39.74102606063073],
        [43.56413492586247, 39.74521124965611],
        [43.562955556885626, 39.748466394704906],
        [43.56278709116334, 39.75125650889575],
        [43.56245012617001, 39.75427914738512],
        [43.56548271755269, 39.75590671103993],
        [43.570873653452495, 39.75474416050389],
        [43.57727473223254, 39.763114520815606],
        [43.58384358289285, 39.75172152201452],
        [43.58451726520659, 39.73474829483169],
      ],
    ],
    { iconContent: "Lorem", hintContent: "0 руб" },
    {
      fillColor: "#ea4e4f",
      // Делаем полигон прозрачным для событий карты.
      interactivityModel: "default#transparent",
      strokeWidth: 4,
      strokeColor: "#dc3545",
      opacity: 0.7,
    }
  );

  mapMainInstance.geoObjects.add(polygonGeometry);
  mapMainInstance.setBounds(polygonGeometry.geometry.getBounds());

  mapMainInstance.geoObjects.add(polygonGeometry2);
  mapMainInstance.setBounds(polygonGeometry2.geometry.getBounds());

  mapMainInstance.geoObjects.add(polygonGeometry3);
  mapMainInstance.setBounds(polygonGeometry3.geometry.getBounds());
}

ymaps.ready(initTestMap);

export { initMapMain, initYandexMap };
