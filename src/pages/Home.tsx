import * as React from 'react';
import './home.scss';
import qrcodeUrl from '@/assets/images/qrcode.jpg'

const Home: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="section section-01">
          <div className="title">白沙屯媽祖</div>
          <div className="sec-title">
            臺/灣/風/霜/百/年/看
            媽/祖/文/化/見/證/心
          </div>
          <div className="body-text">
            數百年來，『媽祖』，一直是臺灣宗教文化中的璀璨焦點。臺灣人對媽祖的尊崇與敬拜，象徵唐山過臺灣的先民傳承，更蘊含臺灣生命力的極致表現。
          </div>
        </div>
        <div className="section section-02">
          <div className="title">
            白沙屯媽祖文化介紹
          </div>
          <div className="sec-title">
            尊崇傳統 · 遇見美好
          </div>
          <div className="body">
            <div className="body-text">
              在”瘋媽祖”狂熱中，臺灣苗栗縣通宵鎮的白沙屯，雖位於海角一隅，進香歷史卻相傳已逾一百八十餘年。
              每年隨白沙屯媽祖繞境的信徒，仍堅持一步一脚印的徒步進香風格，遂成為臺灣媽祖文化中，最獨樹一幟的進香隊伍。
            </div>

            <div className="body-text">
              多年來，白沙屯媽祖的信徒中，不僅有市井百姓、大專院校的學生、教授，甚至知名的藝文團體，也紛紛加入徒步進香的行列，這種多元融合、不分尊卑的信仰力量，吸引全國眾多的義工，投入白沙屯媽祖繞境的行列，努力為臺灣的媽祖文化留下更深刻、完整的人文紀錄。

            </div>
            <div className="body-text">
              候鳥南飛，只為傳承； 媽祖繞境，只為渡眾…，跟隨白沙屯媽祖的脚步，只為難以言喻的文化精神，一生中期待您也能親身體驗一次，感受宗教生命的喜悅！
            </div>
          </div>
        </div>

        <div className="section section-03">
          <div className="title">
            白沙屯媽祖金飯碗
          </div>
          <div className="sec-title">
            臻摯服務·主產品
          </div>
          <div className="body">
            <div className="body-item">
              <div className="body-title">
                金飯碗，如同香燈腳的堅毅步伐──
              </div>
              <div className="body-text">
                每一碗，都承載媽祖的護佑與信眾的虔誠，
                從白沙屯拱天宮到你家餐桌，照亮每一餐的安心與圓滿。
              </div>
            </div>

            <div className="body-item">
              <div className="body-title">
                金飯碗，盛滿努力後的成就──
              </div>
              <div className="body-text">
                每一口，都提醒自己辛苦有回甘，讓日常加班，也能有媽祖的溫暖陪伴。
              </div>
            </div>

            <div className="body-item">
              <div className="body-title">
                金飯碗，承載夢想與希望──
              </div>
              <div className="body-text">
                每一次讀書的深夜，每一頓簡單的飯香，都像媽祖給的加油，陪伴前行的步伐。
              </div>
            </div>

            <div className="body-item">
              <div className="body-title">
                金飯碗，是家人共享的溫度──
              </div>
              <div className="body-text">
                每一頓飯，都盛著媽祖的庇佑與幸福，讓餐桌成為全家人最安心的所在。
              </div>
            </div>

            <div className="body-item">
              <div className="body-title">
                金飯碗，把平凡的日子照亮──
              </div>
              <div className="body-text">
                不論是一人獨食，或三五好友共聚，都有媽祖的祝福，讓日子閃閃發光。
              </div>
            </div>
          </div>
        </div>
        <div className="section section-04 ">
          <div className="title">
            前1000組可獲贈品
          </div>
          <div className="sec-title">
            前1000組·贈品
          </div>
        </div>

        <div className="section section-05 ">
          <div className="title">
            前1000組可獲贈品
          </div>
          <div className="sec-title">
            贈品獲取方式
          </div>
          <div className="body">
            <div className="link">
              <a href="https://lin.ee/S9vYAom" target="_blank">@baishatun</a>
            </div>
            <div className="qr-code">
              <img src={qrcodeUrl} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Home;