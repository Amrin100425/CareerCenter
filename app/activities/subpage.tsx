"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ChevronRight, Search } from "lucide-react";
import { defaultActivities } from "@/lib/store";
import { useLang } from "@/lib/language-context";
import tr, { t } from "@/lib/translations";
