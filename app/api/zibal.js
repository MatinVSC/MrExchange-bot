import axios from "axios";

class Zibal {
  constructor() {
    this.apiKey = process.env.ZIBALKEY;

    // ساخت axios instance با تنظیمات پیش‌فرض
    this.http = axios.create({
      baseURL: "https://api.zibal.ir/v1/facility",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * @param {Object} params - پارامترها
   * @param {string} params.mobile - موبایل کاربر
   * @param {string} params.nationalCode - کد ملی کاربر
   */
  async shahkarInquiry({ mobile, nationalCode }) {
    try {
      const response = await this.http.post("/shahkarInquiry", {
        mobile,
        nationalCode,
      });

      return response.data;
    } catch (error) {
      const err = error.response?.data || error.message;
      console.error("❌ خطا در استعلام:", err);
      throw err;
    }
  }

  /**
   * @param {Object} params - پارامترها
   */
  async cardInquiry({ cardNumber }) {
    try {
      const response = await this.http.post("/cardInquiry", {
        cardNumber,
      });

      return response.data;
    } catch (error) {
      const err = error.response?.data || error.message;
      console.error("❌ خطا در استعلام:", err);
      throw err;
    }
  }

  /**
   * @param {Object} params - پارامترها
   */
  async checkCardWithNationalCode({ nationalCode, birthDate, cardNumber }) {
    try {
      const response = await this.http.post("/checkCardWithNationalCode", {
        nationalCode,
        birthDate,
        cardNumber,
      });

      return response.data;
    } catch (error) {
      const err = error.response?.data || error.message;
      console.error("❌ خطا در استعلام:", err);
      throw err;
    }
  }
}

export default Zibal;
