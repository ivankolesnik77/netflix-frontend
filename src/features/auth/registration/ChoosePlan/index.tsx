import React, { FC } from "react";
import { RegistrationStage } from "..";

const planOptions = [
  "Неограниченный просмотр. Без рекламы.",
  "Персональные рекомендации.",
  "Возможность перейти на другой план или отменить подписку в любое время.",
];

enum TABLE_ROWS {
  MonthlyPrice = "Стоимость за месяц",
  Quality = "Качество",
  Resolution = "Разрешение",
  AccessOthersDevices = "Просмотр на телевизоре, компьютере, телефоне и планшете",
}

const paymentTableRows: PaymentTableRow[] = [
  {
    monthlyPrice: "4.99",
    quality: "Хорошее",
    resolution: 720,
  },
  {
    monthlyPrice: "7.49",
    quality: "Очень хорошее",
    resolution: 1080,
  },
  {
    monthlyPrice: "9.99",
    quality: "Лучшее",
    resolution: "4K",
  },
];

const tableRows = [
  {
    name: "Стоимость за месяц",
    values: paymentTableRows.map((item) => item.monthlyPrice),
  },
  {
    name: "Качество",
    values: paymentTableRows.map((item) => item.monthlyPrice),
  },
  {
    name: "Разрешение",
    values: paymentTableRows.map((item) => item.monthlyPrice),
  },
  {
    name: "Стоимость за месяц",
    values: Array.from({ length: 3 }),
  },
];

interface PaymentTableRow {
  monthlyPrice: string;
  quality: string;
  resolution: string | number;
}

const ChoosePlan: FC<{ stage: RegistrationStage }> = ({ stage }) => {
  return (
    <div className="mx-auto my-5 max-w-[600px]">
      <a className="planFormContainer" data-uia="form-plan-selection">
        <div>
          <div className="stepHeader-container" data-uia="header">
            <div className="stepHeader" role="status">
              <span id="" className="text-xs" data-uia="">
                ШАГ <b>2</b> ИЗ <b>3</b>
              </span>
              <h1 className="text-3xl" data-uia="stepTitle">
                Выберите подходящий план
              </h1>
            </div>
          </div>
          <div className="changeAnytime">
            <ul className="checkmark-group -compact" data-uia="checkmark-group">
              {planOptions.map((name, key) => (
                <li
                  className="flex items-center gap-3 "
                  data-uia="checkmark-group+row-0"
                  key={`plan-option-${key}`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1"
                    data-name="Checkmark"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span
                    className="checkmark-group--text"
                    data-uia="checkmark-group+row-0+content"
                  >
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="planGrid planGrid--has3Plans" data-uia="plan-grid">
          <div className="planGrid__header">
            <div
              className="ml-auto w-[60%]"
              role="radiogroup"
              aria-label="План"
              aria-describedby="planGrid_planChoice_description"
              data-uia="plan-grid-plan-selector"
            >
              {paymentTableRows.map((item, key) => (
                <label
                  key={`payment-plan-${key}`}
                  className="h-[120px] w-[120px] bg-red-600 text-white "
                  htmlFor="planGrid_planChoice_0"
                  data-uia="plan-grid-plan-selector+label-text_1_stream_name"
                >
                  <input
                    type="radio"
                    name="planChoice"
                    className="peer"
                    id="planGrid_planChoice_0"
                    data-uia="plan-grid-plan-selector+input-text_1_stream_name"
                    value="314001031"
                  />
                  <span className="">
                    <span className="content-block transform-translate-x-n1/2 absolute left-1/2 top-full border-t-2 border-red-500 peer-checked:block " />
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <table
            className="planGrid__featureTable"
            role="table"
            data-uia="plan-grid-feature-table"
          >
            <caption className="planGrid__featureTableCaption">
              Планы Netflix
            </caption>
            <tbody
              className="planGrid__featureTableBody"
              data-uia="plan-grid-feature-table-body"
            >
              {tableRows.map((row, key) => {
                return (
                  <tr
                    key={`payment-plan-row-${key}`}
                    role="row"
                    className="flex min-h-[60px] items-center"
                  >
                    <th
                      className="planGrid__cell planGrid__featureCell"
                      data-uia="plan-grid-feature-table-cell+planPrice-feature"
                      scope="row"
                    >
                      {row.name}
                    </th>
                    {row.values.map((item, key) => (
                      <td
                        className="planGrid__cell planGrid__stringCell"
                        role="cell"
                        data-uia="plan-grid-feature-table-cell+planPrice-text_1_stream_name"
                      >
                        {item}
                      </td>
                    ))}
                    <td
                      className="planGrid__cell planGrid__stringCell"
                      role="cell"
                      data-uia="plan-grid-feature-table-cell+planPrice-text_2_stream_name"
                    >
                      7,49 €
                    </td>
                    <td
                      className="planGrid__cell planGrid__cell--isSelected planGrid__stringCell"
                      role="cell"
                      data-uia="plan-grid-feature-table-cell+planPrice-text_4_stream_name"
                    >
                      9,99 €
                    </td>
                  </tr>
                );
              })}

              <tr
                role="row"
                className="planGrid__featureTableRow planGrid__featureTableRow--videoQuality"
              >
                <th
                  className="planGrid__cell planGrid__featureCell"
                  data-uia="plan-grid-feature-table-cell+videoQuality-feature"
                  scope="row"
                >
                  Качество видео
                </th>
                <td
                  className="planGrid__cell planGrid__videoQualityCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+videoQuality-text_1_stream_name"
                >
                  <div className="planGrid__videoQualityLabel">Хорошее</div>
                </td>
                <td
                  className="planGrid__cell planGrid__videoQualityCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+videoQuality-text_2_stream_name"
                >
                  <div className="planGrid__videoQualityLabel">
                    Очень хорошее
                  </div>
                </td>
                <td
                  className="planGrid__cell planGrid__cell--isSelected planGrid__videoQualityCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+videoQuality-text_4_stream_name"
                >
                  <div className="planGrid__videoQualityLabel">Лучшее</div>
                </td>
              </tr>
              <tr
                role="row"
                className="planGrid__featureTableRow planGrid__featureTableRow--resolution"
              >
                <th
                  className="planGrid__cell planGrid__featureCell"
                  data-uia="plan-grid-feature-table-cell+resolution-feature"
                  scope="row"
                >
                  Разрешение
                </th>
                <td
                  className="planGrid__cell planGrid__videoQualityCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+resolution-text_1_stream_name"
                >
                  <div className="planGrid__videoQualityLabel">720p</div>
                </td>
                <td
                  className="planGrid__cell planGrid__videoQualityCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+resolution-text_2_stream_name"
                >
                  <div className="planGrid__videoQualityLabel">1080p</div>
                </td>
                <td
                  className="planGrid__cell planGrid__cell--isSelected planGrid__videoQualityCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+resolution-text_4_stream_name"
                >
                  <div className="planGrid__videoQualityLabel">4K+HDR</div>
                </td>
              </tr>
              <tr
                role="row"
                className="planGrid__featureTableRow planGrid__featureTableRow--noField"
              >
                <th
                  className="planGrid__cell planGrid__featureCell"
                  data-uia="plan-grid-feature-table-cell+3-feature"
                  scope="row"
                >
                  Просмотр на телевизоре, компьютере, телефоне и планшете
                </th>
                <td
                  className="planGrid__cell planGrid__booleanCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+3-text_1_stream_name"
                >
                  <span className="planGrid__booleanLabel">Да</span>
                  <span className="planGrid__booleanIcon" aria-hidden="true">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="planGrid__booleanGraphic planGrid__booleanGraphic--isCheck default-ltr-cache-4z3qvp e1svuwfo1"
                      data-name="Checkmark"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </td>
                <td
                  className="planGrid__cell planGrid__booleanCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+3-text_2_stream_name"
                >
                  <span className="planGrid__booleanLabel">Да</span>
                  <span className="planGrid__booleanIcon" aria-hidden="true">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="planGrid__booleanGraphic planGrid__booleanGraphic--isCheck default-ltr-cache-4z3qvp e1svuwfo1"
                      data-name="Checkmark"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </td>
                <td
                  className="planGrid__cell planGrid__cell--isSelected planGrid__booleanCell"
                  role="cell"
                  data-uia="plan-grid-feature-table-cell+3-text_4_stream_name"
                >
                  <span className="planGrid__booleanLabel">Да</span>
                  <span className="planGrid__booleanIcon" aria-hidden="true">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="planGrid__booleanGraphic planGrid__booleanGraphic--isCheck default-ltr-cache-4z3qvp e1svuwfo1"
                      data-name="Checkmark"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <small className="planGrid__disclaimer planGrid__standardDisclaimer">
              <span id="" data-uia="plan-grid-legal">
                Доступность форматов HD (720p), Full HD (1080p), UltraHD (4K) и
                HDR зависит от вашего подключения к интернету и возможностей
                устройства. Не весь контент доступен во всех разрешениях.
                Подробности приведены в
                <a
                  href="https://help.netflix.com/legal/termsofuse"
                  target="_blank"
                >
                  Правилах использования
                </a>
                .
              </span>
            </small>
            <small className="planGrid__disclaimer planGrid__standardDisclaimer">
              <span id="" data-uia="plan-grid-legal">
                Вашим аккаунтом могут пользоваться только те, кто живет с вами.
                Смотрите Netflix одновременно на 4 разных устройствах с планом
                Премиум, на 2 — со Стандартным планом и на 1 — с Базовым.
              </span>
            </small>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ChoosePlan;
