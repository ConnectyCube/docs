export type LinkType = {
    title: string; 
    href: string;
    icon?: string;
    target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
    forked?: Omit<LinkType, 'forked'>[];
}

export type CardType = {
    title: string;
    description?: string;
    icon: string;
    links: LinkType[];
}

export type MainFeatureCardType = {
    title: string;
    description: string;
    icon: string;
    navigateTo: LinkType;
    links?: LinkType[];
}

type PlatformGetStartedSectionType = {
    links: LinkType[];
};

export type PlatformFeatureType = {
    name: string;
    links: LinkType[];
}

type PlatformFeatureSectionType = {
    features: PlatformFeatureType[];
}

export type PlatformCardType = {
    name: string;
    icon: string;
    getStartedSection: PlatformGetStartedSectionType;
    featuresSection: PlatformFeatureSectionType;
}

export type FeatureOverviewType = {
    title: string;
    description: string;
    anchor: string;
    getStartedDescription: string;
    platforms: PlatformCardType[];
}