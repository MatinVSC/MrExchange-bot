import axios from "axios";

class IpPanel {
  constructor() {
    this.apiKey = process.env.IPPANELKEY;

    this.http = axios.create({
      baseURL: "https://api2.ippanel.com/api/v1/",
      headers: {
        "Content-Type": "application/json",
        "apikey": this.apiKey,
      },
      timeout: 10000,
    });
  };

  /**
   * ارسال پیام با الگو (Pattern Send)
   * @param {string} pattern بدنه الگو (pattern code)
   * @param {string} originator شماره ارسال‌کننده
   * @param {string} recipient شماره دریافت‌کننده
   * @param {object} values متغیرهای الگو
   */
  async sendPattern({ pattern, originator, recipient, values }) {
    try {
      const response = await this.http.post("sms/pattern/normal/send", {
        pattern_code: pattern,
        originator, // sender
        recipient,
        values
      });

      return response.data;
    } catch (error) {
      console.error("IPPanel Error:", error.response?.data || error.message);
      throw new Error("Pattern Send Failed");
    };
  };
};

export default IpPanel;
