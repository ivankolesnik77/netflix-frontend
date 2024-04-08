import React, { FC, useState } from "react";
import { RegistrationStage } from "..";
import { fetcher } from "../../../../services/fetcher";
import { SubscriptionType } from "../../../../store/redux.store";
import { useDispatch } from "react-redux";
import { gql } from "@apollo/client";
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
    name: "Просмотр на телевизоре, компьютере, телефоне и планшете",
    values: Array.from({ length: 3 }),
  },
];

interface PaymentTableRow {
  monthlyPrice: string;
  quality: string;
  resolution: string | number;
}

const activeBoxStyle =
  "opacity-1  after:border-r-[10px] after:border-l-[10px] after:border-t-[10px] after:absolute after:inset-x-1/2 after:top-full after:block after:-translate-x-1/2 after:border-t after:border-solid after:border-t-red-600 after:border-transparent after:content-['']";

const ChoosePlan: FC<{
  stage: RegistrationStage;
  handleSubmit: (subscriptionType: SubscriptionType) => void;
}> = ({ stage, handleSubmit }) => {
  const [activePlanIndex, setActivePlanIndex] = useState(0);

  return (
    <div className="mx-auto my-5 max-w-[978px]">
      <div className="planFormContainer" data-uia="form-plan-selection">
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
          <div className="my-3">
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
                    className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1 "
                    data-name="Checkmark"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
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
              className="ml-auto flex w-[60%] flex-row gap-3"
              role="radiogroup"
              aria-label="План"
              aria-describedby="planGrid_planChoice_description"
              data-uia="plan-grid-plan-selector"
            >
              {paymentTableRows.map((item, key) => (
                <label
                  key={`payment-plan-${key}`}
                  className="relative mx-auto w-1/3"
                  htmlFor="planGrid_planChoice_0"
                  data-uia="plan-grid-plan-selector+label-text_1_stream_name"
                >
                  <input
                    type="radio"
                    name="planChoice"
                    className="absolute left-[50%] appearance-none"
                    id="planGrid_planChoice_0"
                    data-uia="plan-grid-plan-selector+input-text_1_stream_name"
                    value="314001031"
                  />

                  <span
                    onClick={() => setActivePlanIndex(key)}
                    className={`mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-sm bg-red-600 p-4 text-center text-lg font-semibold text-white ${
                      key == activePlanIndex ? activeBoxStyle : "opacity-60"
                    } `}
                  >
                    {item.quality}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <table role="table" className="my-5">
            <tbody
              className="planGrid__featureTableBody"
              data-uia="plan-grid-feature-table-body"
            >
              {tableRows.map((row, key) => {
                return (
                  <tr
                    key={`payment-plan-row-${key}`}
                    role="row"
                    className="h-[60px] items-center border-b border-solid  border-b-gray-500"
                  >
                    <th
                      className="w-[40%]  px-3 py-2"
                      data-uia="plan-grid-feature-table-cell+planPrice-feature"
                      scope="row"
                    >
                      {row.name}
                    </th>
                    {row.values.map((item, key) => {
                      const content = item ?? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="checkmark-group--icon default-ltr-cache-4z3qvp e1svuwfo1 mx-auto block"
                          data-name="Checkmark"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      );
                      return (
                        <td
                          key={`plan-variant-${key}`}
                          className=" px-3 py-2 text-center font-semibold text-red-600"
                          role="cell"
                          data-uia="plan-grid-feature-table-cell+planPrice-text_1_stream_name"
                        >
                          {/* @ts-ignore */}
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-[#737373]">
            <small className="block">
              <span id="" data-uia="plan-grid-legal">
                Доступность форматов HD (720p), Full HD (1080p), UltraHD (4K) и
                HDR зависит от вашего подключения к интернету и возможностей
                устройства. Не весь контент доступен во всех разрешениях.
                Подробности приведены в
                <a
                  href="https://help.netflix.com/legal/termsofuse"
                  target="_blank"
                  className="ml-1 text-[#0071eb]"
                >
                  Правилах использования
                </a>
                .
              </span>
            </small>
            <small className="mt-[10px] block">
              <span id="" data-uia="plan-grid-legal">
                Вашим аккаунтом могут пользоваться только те, кто живет с вами.
                Смотрите Netflix одновременно на 4 разных устройствах с планом
                Премиум, на 2 — со Стандартным планом и на 1 — с Базовым.
              </span>
            </small>
          </div>
          <button
            onClick={() =>
              handleSubmit(Object.values(SubscriptionType)[activePlanIndex])
            }
            type="button"
            className="mt-5 w-full rounded-md bg-red-600 px-8 py-3 font-semibold text-white"
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;
