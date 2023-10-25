import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@shoelace-style/shoelace/dist/themes/dark.css";
// import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/format-date/format-date.js";
// import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/relative-time/relative-time.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
// import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
// import "@shoelace-style/shoelace/dist/components/button/button.js";
// import "@shoelace-style/shoelace/dist/components/menu/menu.js";
// import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";
setBasePath("/shoelace");

import { getHolidayData } from "./helpers";
import { type Holiday } from "./schemas";
import type { SlChangeEvent } from "@shoelace-style/shoelace";

@customElement("next-holiday-app")
export class NextHolidayApp extends LitElement {
  @property({ type: Object })
  nextHoliday: Pick<Holiday, "name" | "description" | "date"> = { name: "", description: "", date: "" };

  @property({ type: Boolean })
  error = false;

  @property()
  errorMessage = "";

  @property()
  relativeDaysSummary = "";

  @property()
  relativeDays = "";

  @property()
  subdivisionName = "";

  @property()
  subdivisionCode = "";

  @property()
  countryName = "";

  @property()
  countryCode = "";

  @property({ type: Array })
  subdivisionNames: string[] = [];

  @property({ type: Array })
  subdivisionCodes: string[] = [];

  countries = {
    au: "Australia",
    gb: "UK",
    ie: "Ireland",
    nz: "New Zealand",
    za: "South Africa",
  };

  static styles = css`
    p {
      margin: 0;
      margin-block: 8px;
    }

    sl-select.purple::part(combobox) {
      // --sl-input-background-color: var(--sl-color-purple-50);
      // --sl-input-border-color: var(--sl-color-purple-300);
      // --sl-input-color: var(--sl-color-purple-700);
      background-color: var(--sl-color-purple-50);
      border-color: var(--sl-color-purple-300);
      color: var(--sl-color-purple-700);

      font-weight: var(--sl-font-weight-bold);
    }

    sl-select.purple::part(display-input) {
      color: var(--sl-color-purple-700);
    }

    sl-select.green::part(combobox) {
      background-color: var(--sl-color-green-50);
      border-color: var(--sl-color-green-300);
      color: var(--sl-color-green-700);

      font-weight: var(--sl-font-weight-bold);
    }

    sl-select.green::part(display-input) {
      color: var(--sl-color-green-700);
    }

    .selector-container {
      display: flex;
    }

    sl-select {
      margin-inline: 4px;
    }

    @media (max-width: 620px) {
      .selector-container {
        display: grid;
        place-content: center;
      }

      sl-select {
        margin-block: 4px;
      }
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadHolidayData();
  }

  render() {
    return html`
      <div
        style="display: grid; place-content: center; font-weight: var(--sl-font-weight-bold); font-size: var(--sl-font-size-large);"
      >
        <p style="text-align: center;">The next holiday in</p>
        <div class="selector-container">
          <sl-select
            @sl-change="${this.handleSelect}"
            id="subdivision-selector"
            pill
            value="${this.subdivisionCode}"
            class="purple"
          >
            ${this.subdivisionNames.map(
              (it, index) => html`<sl-option value="${this.subdivisionCodes[index]}">${it}</sl-option>`
            )}
          </sl-select>
          <sl-select
            @sl-change="${this.handleSelect}"
            id="country-selector"
            pill
            value="${this.countryCode}"
            class="green"
          >
            ${Object.entries(this.countries).map(
              ([code, name]) => html`<sl-option value="${code}">${name}</sl-option>`
            )}
          </sl-select>
        </div>
        <p style="text-align: center;">
          is
          <span style="color: var(--sl-color-red-600)">${this.nextHoliday.name ? this.nextHoliday.name : "__"}</span>
          on
          <span style="color: var(--sl-color-blue-600)">
            <sl-format-date date="${this.nextHoliday.date}" month="long" day="numeric" year="numeric"></sl-format-date>
          </span>
          <br />
          which is
          <span style="color: var(--sl-color-orange-600)">
            <sl-relative-time date="${this.nextHoliday.date}"></sl-relative-time>
          </span>
        </p>
      </div>
    `;
  }

  private async handleSelect(event: SlChangeEvent) {
    const selectorElem = event.target as HTMLSelectElement;

    if (selectorElem.id === "subdivision-selector") {
      await this.loadHolidayData(this.countryCode, selectorElem.value);
    } else if (selectorElem.id === "country-selector") {
      await this.loadHolidayData(selectorElem.value);
    } else {
      console.error("Unsupported selector");
    }
  }

  private async loadHolidayData(countryCode?: string, subdivisionCode?: string) {
    const holidayDataResponse = await getHolidayData(countryCode, subdivisionCode);

    if (!holidayDataResponse.success) {
      this.error = true;
      this.errorMessage = holidayDataResponse.data.message;
      return;
    }

    const {
      headers,
      data: { meta, data },
    } = holidayDataResponse;

    const currentDateString = getCurrentDateString();

    this.countryName = meta.name;
    this.countryCode = meta.code;
    this.subdivisionNames = meta.subdivisions.names;
    this.subdivisionCodes = meta.subdivisions.codes;
    this.subdivisionCode = headers.subdivisionCode;
    this.subdivisionName = meta.subdivisions.mapping[headers.subdivisionCode];

    /* Handle country which has holidays that are specific to subdivisions. */

    if (meta.hasSubdivisionHolidays && headers.subdivisionCode) {
      const subdivisionHolidays = data.filter((it) => it.subdivisionCode === headers.subdivisionCode);
      const nextHoliday = subdivisionHolidays.find((holiday) => holiday.date >= currentDateString);

      this.nextHoliday = {
        name: nextHoliday?.name ?? "",
        date: convertDateStringToIsoString(nextHoliday?.date ?? ""),
        description: nextHoliday?.description ?? "",
      };
      return;
    }

    /* Handle country which does not have holidays that are specific to subdivisions. */

    const nextHoliday = data.find((holiday) => holiday.date >= currentDateString);
    this.nextHoliday = {
      name: nextHoliday?.name ?? "",
      date: convertDateStringToIsoString(nextHoliday?.date ?? ""),
      description: nextHoliday?.description ?? "",
    };
  }
}

function getCurrentDateString(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
}

function convertDateStringToIsoString(date: string): string {
  return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
}

declare global {
  interface HTMLElementTagNameMap {
    "next-holiday-app": NextHolidayApp;
  }
}
