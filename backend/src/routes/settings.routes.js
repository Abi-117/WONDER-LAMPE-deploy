import express from "express";
import SiteSettings from "../models/SiteSettings.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// =====================================================
// GET SETTINGS
// =====================================================
router.get("/", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("❌ Get settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load settings",
      error: error.message,
    });
  }
});

// =====================================================
// UPDATE SETTINGS
// =====================================================
router.put("/", adminAuth, async (req, res) => {
  try {
    const body = req.body || {};

    console.log("==========================================");
    console.log("📝 ADMIN SETTINGS UPDATE");
    console.log("Admin:", req.admin?._id || "Not available");

    // =================================================
    // UPDATE DATA
    // =================================================

    const updateData = {};

    // =================================================
    // ADMIN
    // =================================================

    if (req.admin?._id) {
      updateData.updatedBy = req.admin._id;
    }

    // =================================================
    // PROGRAM
    // =================================================

    if (body.programName !== undefined) {
      updateData.programName = String(body.programName);
    }

    if (body.programPrice !== undefined) {
      updateData.programPrice = Number(body.programPrice);
    }

    if (body.originalPrice !== undefined) {
      updateData.originalPrice = Number(body.originalPrice);
    }

    if (body.showOriginalPrice !== undefined) {
      updateData.showOriginalPrice = Boolean(body.showOriginalPrice);
    }

    if (body.currency !== undefined) {
      updateData.currency = String(body.currency);
    }

    // =================================================
    // HERO
    // =================================================

    if (body.heroTitle !== undefined) {
      updateData.heroTitle = String(body.heroTitle);
    }

    if (body.heroDescription !== undefined) {
      updateData.heroDescription = String(body.heroDescription);
    }

    if (body.primaryCta !== undefined) {
      updateData.primaryCta = String(body.primaryCta);
    }

    if (body.secondaryCta !== undefined) {
      updateData.secondaryCta = String(body.secondaryCta);
    }

    // =================================================
    // STARTING POINT / PROBLEMS
    // =================================================

    if (body.problemsEyebrow !== undefined) {
      updateData.problemsEyebrow = String(body.problemsEyebrow);
    }

    if (body.problemsTitle !== undefined) {
      updateData.problemsTitle = String(body.problemsTitle);
    }

    if (body.problemsDescription !== undefined) {
      updateData.problemsDescription = String(body.problemsDescription);
    }

    if (body.problems !== undefined) {
      updateData.problems = Array.isArray(body.problems)
        ? body.problems
        : [];
    }

    if (body.problemsBottomTitle !== undefined) {
      updateData.problemsBottomTitle = String(
        body.problemsBottomTitle
      );
    }

    if (body.problemsBottomText !== undefined) {
      updateData.problemsBottomText = String(
        body.problemsBottomText
      );
    }

    // =================================================
    // 21 DAYS JOURNEY
    // =================================================

    if (body.journeyEyebrow !== undefined) {
      updateData.journeyEyebrow = String(
        body.journeyEyebrow
      );
    }

    if (body.journeyTitle !== undefined) {
      updateData.journeyTitle = String(
        body.journeyTitle
      );
    }

    if (body.journey !== undefined) {
      updateData.journey = Array.isArray(body.journey)
        ? body.journey
        : [];
    }

    if (body.journeyBottomText !== undefined) {
      updateData.journeyBottomText = String(
        body.journeyBottomText
      );
    }
    // =================================================
// COMPLETE CURRICULUM
// =================================================

if (body.curriculumEyebrow !== undefined) {
  updateData.curriculumEyebrow = String(
    body.curriculumEyebrow
  );
}

if (body.curriculumTitle !== undefined) {
  updateData.curriculumTitle = String(
    body.curriculumTitle
  );
}

if (body.courseModules !== undefined) {
  updateData.courseModules = Array.isArray(
    body.courseModules
  )
    ? body.courseModules.map((module) => ({
        title: String(module?.title || ""),
        topics: Array.isArray(module?.topics)
          ? module.topics.map((topic) =>
              String(topic)
            )
          : [],
      }))
    : [];
}

if (body.curriculumDisclaimer !== undefined) {
  updateData.curriculumDisclaimer = String(
    body.curriculumDisclaimer
  );
}
    // =================================================
    // 🔥 LEARNING OFFER
    // =================================================

    if (body.offerEyebrow !== undefined) {
      updateData.offerEyebrow = String(
        body.offerEyebrow
      );
    }

    if (body.offerTitle !== undefined) {
      updateData.offerTitle = String(
        body.offerTitle
      );
    }

    if (body.offerDescription !== undefined) {
      updateData.offerDescription = String(
        body.offerDescription
      );
    }

    if (body.offerAccessTitle !== undefined) {
      updateData.offerAccessTitle = String(
        body.offerAccessTitle
      );
    }

    if (body.offerButtonText !== undefined) {
      updateData.offerButtonText = String(
        body.offerButtonText
      );
    }

    // =================================================
    // BENEFITS
    // =================================================

    if (body.benefitsEyebrow !== undefined) {
      updateData.benefitsEyebrow = String(
        body.benefitsEyebrow
      );
    }

    if (body.benefitsTitle !== undefined) {
      updateData.benefitsTitle = String(
        body.benefitsTitle
      );
    }

    if (body.benefits !== undefined) {
      updateData.benefits = Array.isArray(body.benefits)
        ? body.benefits
        : [];
    }

    if (body.benefitsButtonText !== undefined) {
      updateData.benefitsButtonText = String(
        body.benefitsButtonText
      );
    }

    // =====================================================
// CERTIFICATES SECTION
// =====================================================

if (body.certificatesEyebrow !== undefined) {
  updateData.certificatesEyebrow = String(
    body.certificatesEyebrow
  );
}

if (body.certificatesTitle !== undefined) {
  updateData.certificatesTitle = String(
    body.certificatesTitle
  );
}

if (body.certificatesDescription !== undefined) {
  updateData.certificatesDescription = String(
    body.certificatesDescription
  );
}

if (body.certificates !== undefined) {
  updateData.certificates = Array.isArray(body.certificates)
    ? body.certificates.map((certificate) => ({
        title: String(certificate?.title || ""),
        alt: String(certificate?.alt || ""),
        image: String(certificate?.image || ""),
      }))
    : [];
}

// =====================================================
// STUDENT REVIEWS SECTION
// =====================================================

if (body.reviewsEyebrow !== undefined) {
  updateData.reviewsEyebrow = String(
    body.reviewsEyebrow
  );
}

if (body.reviewsTitle !== undefined) {
  updateData.reviewsTitle = String(
    body.reviewsTitle
  );
}

if (body.reviewsDescription !== undefined) {
  updateData.reviewsDescription = String(
    body.reviewsDescription
  );
}

if (body.reviews !== undefined) {
  updateData.reviews = Array.isArray(body.reviews)
    ? body.reviews.map((review) => ({
        name: String(review?.name || ""),
        course: String(review?.course || ""),
        text: String(review?.text || ""),
        rating: Math.min(
          5,
          Math.max(
            1,
            Number.isFinite(Number(review?.rating))
              ? Number(review.rating)
              : 5
          )
        ),
        verified: review?.verified === true,
      }))
    : [];
}

    // =================================================
    // DEBUG
    // =================================================

    console.log("Learning Offer:");
    console.log(
      "offerEyebrow:",
      updateData.offerEyebrow
    );

    console.log(
      "offerTitle:",
      updateData.offerTitle
    );

    console.log(
      "offerDescription:",
      updateData.offerDescription
    );

    console.log(
      "offerAccessTitle:",
      updateData.offerAccessTitle
    );

    console.log(
      "offerButtonText:",
      updateData.offerButtonText
    );

    console.log("==========================================");

    // =================================================
    // SAVE TO DATABASE
    // =================================================

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      {
        $set: updateData,
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    // =================================================
    // RESPONSE
    // =================================================

    console.log("✅ SETTINGS SAVED SUCCESSFULLY");

    console.log("Saved Learning Offer:");
    console.log(
      "offerEyebrow:",
      settings.offerEyebrow
    );

    console.log(
      "offerTitle:",
      settings.offerTitle
    );

    console.log(
      "offerDescription:",
      settings.offerDescription
    );

    console.log(
      "offerAccessTitle:",
      settings.offerAccessTitle
    );

    console.log(
      "offerButtonText:",
      settings.offerButtonText
    );

    console.log("==========================================");

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("❌ Update settings error:", error);

    // =================================================
    // MONGOOSE VALIDATION ERROR
    // =================================================

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Settings validation failed",
        error: error.message,
      });
    }

    // =================================================
    // GENERAL ERROR
    // =================================================

    return res.status(500).json({
      success: false,
      message: "Failed to update settings",
      error: error.message,
    });
  }
});

export default router;