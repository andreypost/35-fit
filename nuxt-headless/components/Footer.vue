<template>
  <footer data-aos="fade" class="footer_section">
    <div class="footer_connected">
      <div class="section connected">
        <article class="stay">
          <h2 class="b900 white">{{ $t('footer.stay_connected') }}</h2>
        </article>
        <article>
          <h6 class="green uppercase">{{ $t('footer.newsletter') }}</h6>
          <p>{{ $t('footer.be_first_queue') }}</p>
          <form action="" id="newsForm" class="flex_center_bet">
            <div class="input_box">
              <label htmlFor="email" class="label_styles white">
                {{ $t('common.email_address') }}
              </label>
              <input
                type="email"
                name="email"
                class="light_grey_button part_radius white"
                :placeholder="placeholderText"
                required
              />
            </div>
            <button type="submit" class="light_grey_button green">
              {{ $t('footer.subscribe') }}
            </button>
          </form>
        </article>
        <article class="social">
          <h6 class="green uppercase">{{ $t('footer.social') }}</h6>
          <a href="" class="flex_center_bet">
            <Facebook />
            <span />
          </a>
          <a href="" class="flex_center_bet">
            <Insta />
            <span />
          </a>
          <a href="" class="flex_center_bet">
            <Youtube />
            <span />
          </a>
        </article>
      </div>
    </div>
    <div class="footer_touch">
      <div class="section touch">
        <article class="get">
          <h2 class="b900 white">{{ $t('footer.get_in_touch') }}</h2>
        </article>
        <div class="contacts">
          <article>
            <h6 class="green uppercase">{{ $t('footer.general') }}</h6>
            <a href="tel:+3726669999" class="flex_center_bet phone">
              - 372 666 9999
            </a>
            <a href="mailto:info@35fit.com" class="flex_center_bet email">
              - info@35fit.com
            </a>
            <NuxtLink to="/Faq" class="light_grey_button">
              {{ $t('footer.Careers') }}
              <LangArrow />
            </NuxtLink>
          </article>
          <article>
            <h6 class="green uppercase">{{ $t('nav.club') }}</h6>
            <a href="tel:+3726669999" class="flex_center_bet phone">
              - 372 666 9999
            </a>
            <a href="mailto:gonsiori@35fit.com" class="flex_center_bet email">
              - gonsiori@35fit.com
            </a>
            <NuxtLink to="/Faq" class="light_grey_button">
              {{ $t('footer.contacts') }}
              <LangArrow />
            </NuxtLink>
          </article>
        </div>
        <article class="partners">
          <h6 class="green uppercase">{{ $t('footer.partners') }}</h6>
          <p>{{ $t('footer.search_engine') }}</p>
          <NuxtLink to="/Faq" class="light_grey_button">
            {{ $t('footer.become_partner') }}
            <LangArrow />
          </NuxtLink>
        </article>
      </div>
      <ul class="section flex_center_end_col b700 careers_terms">
        <li>
          <NuxtLink to="/Faq">{{ $t('footer.Careers') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">{{ $t('footer.Privacy') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">{{ $t('footer.Terms') }}</NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts">
import Facebook from '~/assets/icons/Facebook.svg?inline'
import Insta from '~/assets/icons/Insta.svg?inline'
import Youtube from '~/assets/icons/Youtube.svg?inline'
import LangArrow from '~/assets/icons/LangArrow.svg?inline'

export default {
  name: 'Footer',
  components: {
    Facebook,
    Insta,
    Youtube,
    LangArrow,
  },
  computed: {
    placeholderText(): string {
      return (this as any).$t('common.enter_email_address')
    },
  },
}
</script>

<style lang="scss" scoped>
.footer_section {
  h6 {
    font-size: 12px;
    margin-bottom: 20px;
  }
  p {
    font-size: 14px;
    color: #f5f5f5;
  }
  .footer_connected {
    border-bottom: 1px solid rgb(127, 203, 174);
    background-color: #000044;
    .connected {
      display: grid;
      padding-bottom: 60px;
      p {
        margin-bottom: 40px;
      }
      #newsForm {
        gap: 20px;
        .input_box {
          display: grid;
          width: 100%;
          input {
            background-color: #000044;
            &::placeholder {
              font-weight: 400;
              color: #e8e8e8;
            }
            &:-webkit-autofill {
              -webkit-box-shadow: 0 0 0 1000px #004 inset !important;
              box-shadow: 0 0 0 1000px #004 inset !important;
              -webkit-text-fill-color: white !important;
              background-color: transparent !important;
            }
          }
        }
        button {
          width: 122px;
          background-color: #000044;
        }
      }
      .social a {
        gap: 20px;
        margin-top: 25px;
        svg {
          min-width: 24px;
          fill: #7fcbae;
        }
        span {
          width: 90%;
          height: 1px;
          background-color: #1b385c;
        }
      }
      @media (max-width: 1023px) {
        max-width: 480px;
        gap: 40px;
        padding-top: 60px;
        #newsForm {
          flex-flow: column;
          align-items: flex-start;
          button {
            width: 100%;
          }
        }
      }
      @media (min-width: 1024px) {
        justify-content: space-between;
        grid-template-columns: 15% 40% 20%;
        padding-top: 120px;
      }
    }
  }
  .footer_touch {
    a {
      font-size: 14px;
      color: #59b894;
    }
    .touch {
      display: grid;
      margin-bottom: 60px;
      padding-top: 60px;
      .contacts {
        display: grid;
        gap: 60px;
      }
      .contacts,
      .partners {
        .light_grey_button {
          display: flex;
          justify-content: space-between;
        }
      }
      a {
        line-height: 24px;
        svg {
          width: 12px;
          height: 18px;
          fill: #59b894;
          transform: rotate(-90deg);
        }
      }
      .phone {
        color: #f5f5f5;
      }
      .email {
        margin-bottom: 20px;
      }
      @media (max-width: 1023px) {
        max-width: 480px;
        .get {
          margin-bottom: 30px;
        }
        .contacts {
          margin-bottom: 60px;
        }
        .partners {
          p {
            margin-bottom: 20px;
          }
        }
      }
      @media (min-width: 1024px) {
        grid-template-columns: 15% 40% 20%;
        justify-content: space-between;
        .contacts {
          grid-template-columns: 1fr 1fr;
        }
        .partners {
          display: flex;
          flex-flow: column;
          a {
            margin-top: auto;
          }
        }
      }
    }
    .careers_terms {
      gap: 20px;
      padding-bottom: 40px;
      @media (min-width: 1024px) {
        flex-flow: unset;
      }
    }
  }
  .light_grey_button:hover:not(input[type='email']) {
    background-color: #7fcbae !important;
    color: #000044;
  }
}
</style>
