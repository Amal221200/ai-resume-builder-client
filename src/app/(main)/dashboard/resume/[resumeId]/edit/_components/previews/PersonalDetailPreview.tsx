"use client"
import { Separator } from "@/components/ui/separator"
import { use } from "react";
import { EditResumeContext, TEditResumeContext } from "../../../_components/providers/EditResumeProvider";

const PersonalDetailPreview = ({  }: {  }) => {
    const { resumeInfo } = use(EditResumeContext) as TEditResumeContext;

    return (
        <div className="">
            <h2 className="text-center text-xl font-bold" style={{ color: "#222" }}>
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>
            <h3 className="text-center text-sm font-medium">{resumeInfo?.jobTitle}</h3>
            <h5 className="text-center text-xs font-normal"
                style={{ color: "#222" }}
            >{resumeInfo?.address}</h5>
            <div className="flex justify-between">
                <h6 className="text-xs font-normal" style={{ color: "#222" }}>{resumeInfo?.phone}</h6>
                <h6 className="text-xs font-normal" style={{ color: "#222" }}>{resumeInfo?.email}</h6>
            </div>
            <Separator className="my-2 h-[1.5px]" style={{ backgroundColor: "#222" }}  />
        </div>
    )
}

export default PersonalDetailPreview