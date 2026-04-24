
import React, { useState } from "react";
import { Rating, RatingChangeEvent } from "primereact/rating";

export default function WithoutCancelDemo() {
    const [value, setValue] = useState<number>(null);

    return (
        <div className="card flex justify-content-center">
            <Rating value={value} onChange={(e : RatingChangeEvent) => setValue(e.value!)} cancel={false} />
        </div>
    );
}
        