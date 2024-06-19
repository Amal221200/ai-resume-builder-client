"use client"

import { use } from "react";
import { EditReviewContext, TEditorReviewContext } from "./providers/EditReviewProvider";
import PersonalDetailPreview from "./previews/PersonalDetailPreview";
import SummaryPreview from "./previews/SummaryPreview";
import ExperiencePreview from "./previews/ExperiencePreview";
import EducationPreview from "./previews/EducationPreview";
import SkillsPreview from "./previews/SkillsPreview";
import { cn } from "@/lib/utils";

const PreviewSection = ({ className }: { className?: string }) => {
    const { resumeInfo } = use(EditReviewContext) as TEditorReviewContext;

    return (
        <div className={cn("no-scrollbar h-[85vh] overflow-auto border-t-[20px] bg-white p-14 text-black shadow-lg dark:shadow-neutral-800", className)}
            style={{ borderColor: resumeInfo.attributes?.themeColor }}>
            {resumeInfo.attributes.firstName && <PersonalDetailPreview />}
            {resumeInfo.attributes.summary && <SummaryPreview />}
            {resumeInfo.attributes.experience && <ExperiencePreview />}
            {resumeInfo.attributes.education && <EducationPreview />}
            {resumeInfo.attributes.skills && <SkillsPreview />}
        </div>
    )
}

export default PreviewSection