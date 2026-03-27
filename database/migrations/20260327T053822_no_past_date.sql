ALTER TABLE work_hours
ADD CONSTRAINT no_past_date
CHECK (date >= CURRENT_DATE);