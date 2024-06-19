"use client"
import { use } from "react";
import { EditReviewContext, TEditorReviewContext } from "../providers/EditReviewProvider";


const SummaryPreview = ({  }: { }) => {

    const { resumeInfo, setResumeInfo } = use(EditReviewContext) as TEditorReviewContext;
    return (
        <p className="text-xs font-medium">
            {resumeInfo.attributes?.summary}
        </p>
    )
}

export default SummaryPreview