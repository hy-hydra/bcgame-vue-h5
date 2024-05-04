<template>
  <div class="footer bg-fog-13 p-24px">
    <div class="footer-link-wrap mt-16px">
      <p class="text-center text-16px text-text-3">Casino</p>
      <div class="flex text-12px flex gap-12px justify-center flex-wrap">
        <!-- <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Casino Home</span>
        </a> -->
        <a
          @click="
            () => {
              toList('slots');
            }
          "
          class="text-text-4 whitespace-nowrap"
        >
          <span>Slots</span>
        </a>
        <a
          @click="
            () => {
              toList('ent');
            }
          "
          class="text-text-4 whitespace-nowrap"
        >
          <span>Ent</span>
        </a>
        <!-- <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Live Casino</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>New Releases</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Recommended</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Table Game</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>BlackJack</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Roulettle</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Baccarat</span>
        </a> -->
      </div>
    </div>
    <!-- <div class="footer-link-wrap mt-16px">
      <p class="text-center text-16px text-text-3">Sports</p>
      <div class="flex text-12px flex gap-12px justify-center flex-wrap">
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Sports Home</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Live</span>
        </a>
        <a
          href="/casino"
          class="text-text-4 whitespace-nowrap flex items-center"
        >
          <span>Sport Betting Insights </span>
          <svg
            class="fill-text-4 h-12px w-12px ml-4px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M365.386 83.556c31.44 0 56.926 25.486 56.926 56.926 0 30.897-24.617 56.046-55.307 56.904l-1.62 0.022h-170.777v629.186h629.186v-170.777c0-30.897 24.617-56.046 55.307-56.904l1.62-0.022c30.897 0 56.045 24.617 56.904 55.307l0.022 1.62v179.768c0 57.258-45.887 103.796-102.894 104.848l-1.968 0.017h-647.16c-57.258 0-103.796-45.887-104.848-102.894l-0.017-1.968v-647.16c0-57.258 45.887-103.796 102.894-104.848l1.968-0.017h179.768zM611.108 84.556l1.62 0.013 227.481 4.701c57.907 1.009 104.028 48.774 103.019 106.677l-1.176 62.495-1.198 54.931-1.442 62.539-0.437 21.864c-0.034 1.776-0.066 3.547-0.094 5.315-0.549 31.434-26.475 56.472-57.909 55.926s-56.472-26.475-55.926-57.909l0.308-16.334 2.11-93 0.246-11.744-360.933 330.867c-23.176 21.246-59.187 19.678-80.428-3.495-20.849-22.748-19.728-57.854 2.233-79.234l1.267-1.193 355.396-325.787-134.861-2.783c-30.889-0.638-55.524-25.77-55.748-56.469l0.013-1.62c0.638-30.889 25.77-55.524 56.469-55.748z"
            ></path>
          </svg>
        </a>
      </div>
    </div> -->
    <div class="footer-link-wrap mt-16px">
      <p class="text-center text-16px text-text-3">Promo</p>
      <div class="flex text-12px flex gap-12px justify-center flex-wrap">
        <!-- <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>VIP Club</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Affiliate</span>
        </a> -->
        <a @click="toPromotions" class="text-text-4 whitespace-nowrap">
          <span>Promotions</span>
        </a>
        <a
          @click="
            () => {
              toList('lottery');
            }
          "
          class="text-text-4 whitespace-nowrap"
        >
          <span>Lottery</span>
        </a>
        <!-- <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Refer a friend</span>
        </a> -->
      </div>
    </div>
    <!-- <div class="footer-link-wrap mt-16px">
      <p class="text-center text-16px text-text-3">Support/Legal</p>
      <div class="flex text-12px flex gap-12px justify-center flex-wrap">
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Help center</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Gamble Aware</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Fairness</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>FAQ</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Privacy Policy</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Terms Of Service</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Self-exclusion</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>AML</span>
        </a>
        <a
          href="/casino"
          class="text-text-4 whitespace-nowrap flex items-center"
        >
          <span>Design Resources </span>
          <svg
            class="fill-text-4 h-12px w-12px ml-4px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M365.386 83.556c31.44 0 56.926 25.486 56.926 56.926 0 30.897-24.617 56.046-55.307 56.904l-1.62 0.022h-170.777v629.186h629.186v-170.777c0-30.897 24.617-56.046 55.307-56.904l1.62-0.022c30.897 0 56.045 24.617 56.904 55.307l0.022 1.62v179.768c0 57.258-45.887 103.796-102.894 104.848l-1.968 0.017h-647.16c-57.258 0-103.796-45.887-104.848-102.894l-0.017-1.968v-647.16c0-57.258 45.887-103.796 102.894-104.848l1.968-0.017h179.768zM611.108 84.556l1.62 0.013 227.481 4.701c57.907 1.009 104.028 48.774 103.019 106.677l-1.176 62.495-1.198 54.931-1.442 62.539-0.437 21.864c-0.034 1.776-0.066 3.547-0.094 5.315-0.549 31.434-26.475 56.472-57.909 55.926s-56.472-26.475-55.926-57.909l0.308-16.334 2.11-93 0.246-11.744-360.933 330.867c-23.176 21.246-59.187 19.678-80.428-3.495-20.849-22.748-19.728-57.854 2.233-79.234l1.267-1.193 355.396-325.787-134.861-2.783c-30.889-0.638-55.524-25.77-55.748-56.469l0.013-1.62c0.638-30.889 25.77-55.524 56.469-55.748z"
            ></path>
          </svg>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>APP</span>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Live Support</span>
        </a>
      </div>
    </div>
    <div class="footer-link-wrap mt-16px">
      <p class="text-center text-16px text-text-3">About Us</p>
      <div class="flex text-12px flex gap-12px justify-center flex-wrap">
        <a
          href="/casino"
          class="text-text-4 whitespace-nowrap flex items-center"
        >
          <span>News</span>
          <svg
            class="fill-text-4 h-12px w-12px ml-4px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M365.386 83.556c31.44 0 56.926 25.486 56.926 56.926 0 30.897-24.617 56.046-55.307 56.904l-1.62 0.022h-170.777v629.186h629.186v-170.777c0-30.897 24.617-56.046 55.307-56.904l1.62-0.022c30.897 0 56.045 24.617 56.904 55.307l0.022 1.62v179.768c0 57.258-45.887 103.796-102.894 104.848l-1.968 0.017h-647.16c-57.258 0-103.796-45.887-104.848-102.894l-0.017-1.968v-647.16c0-57.258 45.887-103.796 102.894-104.848l1.968-0.017h179.768zM611.108 84.556l1.62 0.013 227.481 4.701c57.907 1.009 104.028 48.774 103.019 106.677l-1.176 62.495-1.198 54.931-1.442 62.539-0.437 21.864c-0.034 1.776-0.066 3.547-0.094 5.315-0.549 31.434-26.475 56.472-57.909 55.926s-56.472-26.475-55.926-57.909l0.308-16.334 2.11-93 0.246-11.744-360.933 330.867c-23.176 21.246-59.187 19.678-80.428-3.495-20.849-22.748-19.728-57.854 2.233-79.234l1.267-1.193 355.396-325.787-134.861-2.783c-30.889-0.638-55.524-25.77-55.748-56.469l0.013-1.62c0.638-30.889 25.77-55.524 56.469-55.748z"
            ></path>
          </svg>
        </a>
        <a
          href="/casino"
          class="text-text-4 whitespace-nowrap flex items-center"
        >
          <span>Work with us</span>
          <svg
            class="fill-text-4 h-12px w-12px ml-4px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M365.386 83.556c31.44 0 56.926 25.486 56.926 56.926 0 30.897-24.617 56.046-55.307 56.904l-1.62 0.022h-170.777v629.186h629.186v-170.777c0-30.897 24.617-56.046 55.307-56.904l1.62-0.022c30.897 0 56.045 24.617 56.904 55.307l0.022 1.62v179.768c0 57.258-45.887 103.796-102.894 104.848l-1.968 0.017h-647.16c-57.258 0-103.796-45.887-104.848-102.894l-0.017-1.968v-647.16c0-57.258 45.887-103.796 102.894-104.848l1.968-0.017h179.768zM611.108 84.556l1.62 0.013 227.481 4.701c57.907 1.009 104.028 48.774 103.019 106.677l-1.176 62.495-1.198 54.931-1.442 62.539-0.437 21.864c-0.034 1.776-0.066 3.547-0.094 5.315-0.549 31.434-26.475 56.472-57.909 55.926s-56.472-26.475-55.926-57.909l0.308-16.334 2.11-93 0.246-11.744-360.933 330.867c-23.176 21.246-59.187 19.678-80.428-3.495-20.849-22.748-19.728-57.854 2.233-79.234l1.267-1.193 355.396-325.787-134.861-2.783c-30.889-0.638-55.524-25.77-55.748-56.469l0.013-1.62c0.638-30.889 25.77-55.524 56.469-55.748z"
            ></path>
          </svg>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Business Contacts</span>
        </a>
        <a
          href="/casino"
          class="text-text-4 whitespace-nowrap flex items-center"
        >
          <span>Help Desk</span>
          <svg
            class="fill-text-4 h-12px w-12px ml-4px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M365.386 83.556c31.44 0 56.926 25.486 56.926 56.926 0 30.897-24.617 56.046-55.307 56.904l-1.62 0.022h-170.777v629.186h629.186v-170.777c0-30.897 24.617-56.046 55.307-56.904l1.62-0.022c30.897 0 56.045 24.617 56.904 55.307l0.022 1.62v179.768c0 57.258-45.887 103.796-102.894 104.848l-1.968 0.017h-647.16c-57.258 0-103.796-45.887-104.848-102.894l-0.017-1.968v-647.16c0-57.258 45.887-103.796 102.894-104.848l1.968-0.017h179.768zM611.108 84.556l1.62 0.013 227.481 4.701c57.907 1.009 104.028 48.774 103.019 106.677l-1.176 62.495-1.198 54.931-1.442 62.539-0.437 21.864c-0.034 1.776-0.066 3.547-0.094 5.315-0.549 31.434-26.475 56.472-57.909 55.926s-56.472-26.475-55.926-57.909l0.308-16.334 2.11-93 0.246-11.744-360.933 330.867c-23.176 21.246-59.187 19.678-80.428-3.495-20.849-22.748-19.728-57.854 2.233-79.234l1.267-1.193 355.396-325.787-134.861-2.783c-30.889-0.638-55.524-25.77-55.748-56.469l0.013-1.62c0.638-30.889 25.77-55.524 56.469-55.748z"
            ></path>
          </svg>
        </a>
        <a href="/casino" class="text-text-4 whitespace-nowrap">
          <span>Verify Representative</span>
        </a>
        <a
          href="/casino"
          class="text-text-4 whitespace-nowrap flex items-center"
        >
          <span>Hashbet</span>
          <svg
            class="fill-text-4 h-12px w-12px ml-4px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M365.386 83.556c31.44 0 56.926 25.486 56.926 56.926 0 30.897-24.617 56.046-55.307 56.904l-1.62 0.022h-170.777v629.186h629.186v-170.777c0-30.897 24.617-56.046 55.307-56.904l1.62-0.022c30.897 0 56.045 24.617 56.904 55.307l0.022 1.62v179.768c0 57.258-45.887 103.796-102.894 104.848l-1.968 0.017h-647.16c-57.258 0-103.796-45.887-104.848-102.894l-0.017-1.968v-647.16c0-57.258 45.887-103.796 102.894-104.848l1.968-0.017h179.768zM611.108 84.556l1.62 0.013 227.481 4.701c57.907 1.009 104.028 48.774 103.019 106.677l-1.176 62.495-1.198 54.931-1.442 62.539-0.437 21.864c-0.034 1.776-0.066 3.547-0.094 5.315-0.549 31.434-26.475 56.472-57.909 55.926s-56.472-26.475-55.926-57.909l0.308-16.334 2.11-93 0.246-11.744-360.933 330.867c-23.176 21.246-59.187 19.678-80.428-3.495-20.849-22.748-19.728-57.854 2.233-79.234l1.267-1.193 355.396-325.787-134.861-2.783c-30.889-0.638-55.524-25.77-55.748-56.469l0.013-1.62c0.638-30.889 25.77-55.524 56.469-55.748z"
            ></path>
          </svg>
        </a>
      </div>
    </div> -->
    <p class="text-text-3 text-center mt-24px">Join our Community</p>
    <div class="footer-commiunity-icons flex items-center gap-12px mt-24px">
      <div class="icon-item">
        <img
          src="@/assets/layout/footer/telegram.webp"
          alt="telegram"
          class="h-34px"
        />
      </div>
      <div class="icon-item">
        <img
          src="@/assets/layout/footer/github.webp"
          alt="github"
          class="h-34px"
        />
      </div>
      <div class="icon-item">
        <img
          src="@/assets/layout/footer/twitter.webp"
          alt="twitter"
          class="h-34px"
        />
      </div>
      <div class="icon-item">
        <img
          src="@/assets/layout/footer/facebook.webp"
          alt="facebook"
          class="h-34px"
        />
      </div>
      <div class="icon-item">
        <img
          src="@/assets/layout/footer/discord.webp"
          alt="discord"
          class="h-34px"
        />
      </div>
      <div class="icon-item">
        <img
          src="@/assets/layout/footer/bitcoin.webp"
          alt="bitcoin"
          class="h-34px"
        />
      </div>
      <div class="icon-item">
        <img
          src="@/assets/layout/footer/instagram.webp"
          alt="instagram"
          class="h-34px"
        />
      </div>
    </div>
    <JoinMember />
  </div>
</template>

<script setup lang="ts">
import JoinMember from "@/components/join-members/index.vue";

const router = useRouter();

const toList = group => {
  router.push({ name: "game-list", params: { group } });
};

const toPromotions = () => {
  router.push({ name: "promotions" });
};
</script>

<style></style>
