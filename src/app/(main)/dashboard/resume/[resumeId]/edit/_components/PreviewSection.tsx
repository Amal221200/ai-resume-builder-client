"use client"
import { use } from "react";
import { EditResumeContext, TEditResumeContext } from "../../_components/providers/EditResumeProvider";
import PersonalDetailPreview from "./previews/PersonalDetailPreview";
import SummaryPreview from "./previews/SummaryPreview";
import ExperiencePreview from "./previews/ExperiencePreview";
import EducationPreview from "./previews/EducationPreview";
import SkillsPreview from "./previews/SkillsPreview";
import { cn } from "@/lib/utils";
import ProjectsPreview from "./previews/ProjectsPreview";
import CertificatesPreview from "./previews/CertificatesPreview";
// import PreviewButtons from "../../_components/PreviewButtons";


const PreviewSection = ({ className, scrollable }: { className?: string, scrollable?: boolean }) => {
    const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

    return (
        <div>
            <div className={cn("border-t-[20px] bg-white sm:p-14 p-3 text-black shadow-lg print-remove-shadow", scrollable && "no-scrollbar h-[85vh] overflow-auto", className)}
                style={{ borderColor: resumeInfo.attributes?.themeColor }}>
                {resumeInfo.attributes.firstName && <PersonalDetailPreview />}
                {resumeInfo.attributes.summary && <SummaryPreview />}
                {!!resumeInfo.attributes.experiences.length && <ExperiencePreview />}
                {!!resumeInfo.attributes.educations.length && <EducationPreview />}
                {!!resumeInfo.attributes.skills.length && <SkillsPreview />}
                {!!resumeInfo.attributes.projects.length && <ProjectsPreview />}
                {!!resumeInfo.attributes.certificates.length && <CertificatesPreview />}
            </div>
        </div>
    )
}

export default PreviewSection