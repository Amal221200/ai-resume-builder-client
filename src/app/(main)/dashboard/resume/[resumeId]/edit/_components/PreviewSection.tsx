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


const PreviewSection = ({ className, scrollable }: { className?: string, scrollable?: boolean }) => {
    const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

    return (
        <div>
            <div className={cn("border-t-[20px] bg-white sm:p-14 p-3 text-black shadow-lg print-remove-shadow", scrollable && "no-scrollbar h-[85vh] overflow-auto", className)}>
                {resumeInfo.firstName && <PersonalDetailPreview />}
                {resumeInfo.summary && <SummaryPreview />}
                {!!resumeInfo.experiences?.length && <ExperiencePreview />}
                {!!resumeInfo.educations?.length && <EducationPreview />}
                {!!resumeInfo.skills?.length && <SkillsPreview />}
                {!!resumeInfo.projects?.length && <ProjectsPreview />}
                {!!resumeInfo.certificates?.length && <CertificatesPreview />}
            </div>
        </div>
    )
}

export default PreviewSection