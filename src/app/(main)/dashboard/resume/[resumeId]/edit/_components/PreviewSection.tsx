"use client"
import { use } from "react";
import { EditResumeContext, TEditResumeContext } from "./providers/EditResumeProvider";
import PersonalDetailPreview from "./previews/PersonalDetailPreview";
import SummaryPreview from "./previews/SummaryPreview";
import ExperiencePreview from "./previews/ExperiencePreview";
import EducationPreview from "./previews/EducationPreview";
import SkillsPreview from "./previews/SkillsPreview";
import { cn } from "@/lib/utils";
// import PreviewButtons from "../../_components/PreviewButtons";


const PreviewSection = ({ className, scrollable }: { className?: string, scrollable?: boolean }) => {
    const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

    return (
        <div>
            {/* <PreviewButtons /> */}
            <div className={cn("border-t-[20px] bg-white p-14 text-black shadow-lg print-remove-shadow", scrollable && "no-scrollbar h-[85vh] overflow-auto", className)}
                style={{ borderColor: resumeInfo.attributes?.themeColor }}>
                {resumeInfo.attributes.firstName && <PersonalDetailPreview />}
                {resumeInfo.attributes.summary && <SummaryPreview />}
                {!!resumeInfo.attributes.experience?.length && <ExperiencePreview />}
                {!!resumeInfo.attributes.education?.length && <EducationPreview />}
                {!!resumeInfo.attributes.skills?.length && <SkillsPreview />}
            </div>
        </div>
    )
}

export default PreviewSection