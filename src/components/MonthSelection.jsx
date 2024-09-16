import React, { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import moment from 'moment';
import { Button } from './ui/button';
import { CalendarDays } from 'lucide-react';
import { addMonths } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";

export default function MonthSelection({selectedMonth}) {
    const today = new Date();
    const nextMonth = addMonths(today, 0);
    const [month, setMonth] = useState(nextMonth);

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {month ? moment(month).format('MMMM yyyy') : <span>Pick a month</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        month={month}
                        onMonthChange={(value) => {
                            selectedMonth(value);
                            setMonth(value);
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}