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
    center: [43.585472, 39.723089], // Сочи
    zoom: 15,
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

export { initMapMain, initYandexMap };
