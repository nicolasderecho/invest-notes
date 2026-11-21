import type { Review } from "./types";
import { buyingReview, localReview, taxReview } from "./sources";
import { boprealReview, sovereignReview } from "./local/bonds";
import { incomeReview } from "./income";
export const glossaryReview: Review = {
  lastReviewed: "2026-11-21",
  sources: [
    ...new Map(
      [
        ...buyingReview.sources,
        ...localReview.sources,
        ...taxReview.sources,
        ...boprealReview.sources,
        ...sovereignReview.sources,
        ...incomeReview.sources,
        {
          label: "Investor.gov · Bid, Ask y Spread",
          url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/ask-price",
        },
        {
          label: "Investor.gov · Bear market",
          url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/bear-market",
        },
        {
          label: "Investor.gov · Bull market",
          url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/bull-market",
        },
      ].map((source) => [source.url, source]),
    ).values(),
  ],
};
