process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
process.env.GCLOUD_PROJECT = "fivehive-fdce3";

const { default: admin } = await import("firebase-admin");

admin.initializeApp({ projectId: "fivehive-fdce3" }); // matches .firebaserc
const db = admin.firestore();


await db.doc("subjects/test-subject").set({
  title: "Test Subject",
  hasUnit0: false,
  units: [
    {
      id: "u1",
      title: "Unit 1",
      chapters: [{ id: "c1", title: "Test Chapter", isPublic: false }],
    },
  ],
});

await db.doc("subjects/test-subject/units/u1/chapters/c1").set({
  title: "Test Chapter",
  author: "test-uid",
  displayName: "Test Author",
  data: {
    time: Date.now(),
    version: "2.28.0",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Consider the function f(x) = (x^2-2x-8)/(x^2+2x-15). For how many integers k is f(k) < 0?",
        },
      },
      {
        type: "table",
        data: {
          withHeadings: true,
          // Padded out to way more columns than the real sign chart so the
          // table is guaranteed to overflow a normal browser window without
          // needing DevTools responsive mode. Safe to shrink back to the
          // real 9-column version once the scroll behavior is confirmed.
          content: {
            row0: [
              "(-∞, -5)", "-5", "(-5, -2)", "-2", "(-2, 3)", "3", "(3, 4)", "4",
              "(4, 4.5)", "4.5", "(4.5, 5)", "5", "(5, 5.5)", "5.5", "(5.5, 6)", "6",
              "(6, ∞)",
            ],
            row1: [
              "+", "undefined", "-", "0", "+", "undefined", "-", "0",
              "undefined", "0", "undefined", "0", "undefined", "0", "undefined", "0",
              "+",
            ],
          },
        },
      },
    ],
  },
});

console.log("Seeded subjects/test-subject/units/u1/chapters/c1");
process.exit(0);
