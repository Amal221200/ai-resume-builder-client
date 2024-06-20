"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import PreviewSection from "../PreviewSection"

const PreviewModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className="max-w-[42rem]">
                <PreviewSection scrollable />
            </DialogContent>
        </Dialog>
    )
}

export default PreviewModal