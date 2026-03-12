'use client';
import QuotePage from "@/containers/QuotePage";

function QuotePricingPage({ params }: { params: { quoteId: string } }) {
    const { quoteId } = params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <QuotePage quoteId={quoteId} />
        </div>
    )
}

export default QuotePricingPage;