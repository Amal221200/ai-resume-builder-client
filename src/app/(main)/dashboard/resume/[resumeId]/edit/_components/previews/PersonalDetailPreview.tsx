"use client"
import { Separator } from "@/components/ui/separator"
import { use } from "react";
import { EditResumeContext, TEditResumeContext } from "../../../_components/providers/EditResumeProvider";
import LinksPreview from "./LinksPreview";

const PersonalDetailPreview = ({ }: {}) => {
    const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

    return (
        <div>
            <h2 className="text-center text-base font-bold sm:text-xl">
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <h3 className="mb-0 text-center text-[9px] font-medium sm:text-sm">{resumeInfo?.jobTitle}</h3>
            {!!resumeInfo.links.length && <LinksPreview />}
            <h5 className="text-center text-[8px] font-normal sm:text-xs">{resumeInfo?.address}</h5>
            <div className="flex justify-between">
                <h6 className="text-[8px] font-normal sm:text-xs">
                    <a target="_blank" href={`tel:${resumeInfo.phone}`}>{resumeInfo.phone}</a>
                </h6>
                <h6 className="text-[8px] font-normal sm:text-xs">
                    <a target="_blank" href={`mailto:${resumeInfo.email}`}>{resumeInfo.email}</a>
                </h6>
            </div>
            <Separator className="my-2 h-[1.5px]" style={{ backgroundColor: "#222" }} />
        </div>
    )
}

export default PersonalDetailPreview