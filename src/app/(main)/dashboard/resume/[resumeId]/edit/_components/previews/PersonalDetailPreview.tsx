"use client"
import { Separator } from "@/components/ui/separator"
import { use } from "react";
import { EditReviewContext, TEditorReviewContext } from "../providers/EditReviewProvider";

const PersonalDetailPreview = ({  }: {  }) => {
    const { resumeInfo, setResumeInfo } = use(EditReviewContext) as TEditorReviewContext;

    return (
        <div className="">
            <h2 className="text-center text-xl font-bold" style={{ color: resumeInfo.attributes?.themeColor }}>
                {resumeInfo.attributes?.firstName} {resumeInfo.attributes?.lastName}
            </h2>
            <h3 className="text-center text-sm font-medium">{resumeInfo.attributes?.jobTitle}</h3>
            <h5 className="text-center text-xs font-normal"
                style={{ color: resumeInfo.attributes?.themeColor }}
            >{resumeInfo.attributes?.address}</h5>
            <div className="flex justify-between">
                <h6 className="text-xs font-normal" style={{ color: resumeInfo.attributes?.themeColor }}>{resumeInfo.attributes?.phone}</h6>
                <h6 className="text-xs font-normal" style={{ color: resumeInfo.attributes?.themeColor }}>{resumeInfo.attributes?.email}</h6>
            </div>
            <Separator className="my-2 h-[1.5px]" style={{ backgroundColor: resumeInfo.attributes?.themeColor }}  />
        </div>
    )
}

export default PersonalDetailPreview