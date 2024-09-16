import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GradeSelection({ selectedGrade }) {
    const handleGradeChange = (value) => {
        selectedGrade(value);
    };

    return (
        <div>
            <Select onValueChange={handleGradeChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5th">5th Grade</SelectItem>
                    <SelectItem value="6th">6th Grade</SelectItem>
                    <SelectItem value="7th">7th Grade</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}