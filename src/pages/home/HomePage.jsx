import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "../container/Hero";
import Article from "../container/Articles";
import CTA from "../container/CTA";
const HomePage = () => {
    return (
        <MainLayout>
            <Hero />
            <Article />
            <CTA />
        </MainLayout>
    );
};

export default HomePage;
