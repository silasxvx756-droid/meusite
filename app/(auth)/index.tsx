import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  useWindowDimensions,
  Animated,
  Easing,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Injeta estilo global no navegador para remover margens e evitar fundo branco no bounce/scroll da Vercel
if (Platform.OS === "web" && typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    html, body, #root {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      overflow-x: hidden;
      background-color: transparent !important;
    }
  `;
  document.head.appendChild(style);
}

const WHATSAPP = "557382372249";

const abrirWhatsApp = () => {
  const mensagem = encodeURIComponent(
    "Olá! Sou designer gráfico e gostaria de conhecer sua plataforma. Seria possível realizar um teste grátis?"
  );

  Linking.openURL(
    `https://wa.me/${WHATSAPP}?text=${mensagem}`
  );
};

/* =========================================================
   LOGO COM EFEITO HOVER
========================================================= */

function AnimatedLogo({ isFooter = false, isMobile = false }: { isFooter?: boolean; isMobile?: boolean }) {
  // Se for o rodapé e estiver no mobile, não exibe a logo
  if (isFooter && isMobile) {
    return null;
  }

  const [hovered, setHovered] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: hovered ? 1.08 : 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: hovered ? 0.88 : 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [hovered]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale }],
          opacity,
        },
        isFooter && styles.footerLogoContainer,
        isMobile && !isFooter && styles.mobileLogoContainer,
      ]}
      {...({
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      } as any)}
    >
      <Image
        source={require("../../assets/images/aaa.png")}
        style={[
          styles.logoImage,
          isFooter && styles.footerLogoImage,
          isMobile && !isFooter && styles.mobileLogoImage,
        ]}
        resizeMode="contain"
        accessibilityLabel="Logo Conect Designer"
      />
    </Animated.View>
  );
}

/* =========================================================
   TELA DE CARREGAMENTO
========================================================= */

function LoadingScreen() {
  const rotation = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const rotationAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.12,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    rotationAnimation.start();
    pulseAnimation.start();

    return () => {
      rotationAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <LinearGradient
      colors={[
        "#020611",
        "#061329",
        "#0b1730",
        "#100d27",
        "#050817",
        "#020611",
      ]}
      locations={[0, 0.18, 0.38, 0.58, 0.8, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.loadingScreen}
    >
      <Animated.View
        style={[
          styles.loadingSpinnerOuter,
          {
            transform: [
              { rotate },
              { scale: pulse },
            ],
          },
        ]}
      >
        <View style={styles.loadingSpinnerInner} />
      </Animated.View>

      <Text style={styles.loadingLogo}>
        Conect Designer
      </Text>

      <Text style={styles.loadingText}>
        Carregando...
      </Text>
    </LinearGradient>
  );
}

/* =========================================================
   BOLINHA PULSANDO
========================================================= */

function PulsingDot() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.35,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.45,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.pulsingDot,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
}

/* =========================================================
   BOTÃO VER OFERTA
========================================================= */

function AnimatedHeaderButton({
  onPress,
  isMobile,
}: {
  onPress: () => void;
  isMobile: boolean;
}) {
  if (isMobile) {
    return null;
  }

  const [hovered, setHovered] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loopAnimation: Animated.CompositeAnimation | null = null;

    if (hovered) {
      loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );
      loopAnimation.start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }

    return () => {
      if (loopAnimation) loopAnimation.stop();
    };
  }, [hovered]);

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.025, 1.055],
  });

  const shadowOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.25, 0.55, 0.9],
  });

  const shadowRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 24],
  });

  const glowOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.35, 0.8],
  });

  const shinePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 180],
  });

  return (
    <Animated.View
      style={[
        styles.headerButtonWrapper,
        {
          transform: [{ scale }],
          shadowOpacity,
          shadowRadius,
        },
      ]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            styles.headerButtonGlow,
            {
              opacity: glowOpacity,
              transform: [
                { translateX: shinePosition },
                { rotate: "-18deg" },
              ],
            },
          ]}
        />
        <Text style={styles.headerButtonText}>Ver oferta</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* =========================================================
   BOTÃO PRINCIPAL
========================================================= */

function AnimatedHeroButton({
  onPress,
  isMobile,
}: {
  onPress: () => void;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loopAnimation: Animated.CompositeAnimation | null = null;

    if (hovered) {
      loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );
      loopAnimation.start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }

    return () => {
      if (loopAnimation) loopAnimation.stop();
    };
  }, [hovered]);

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.018, 1.035],
  });

  const shadowOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.22, 0.5, 0.9],
  });

  const shadowRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 30],
  });

  const glowOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.35, 0.8],
  });

  const shinePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 450],
  });

  return (
    <Animated.View
      style={[
        styles.heroButtonWrapper,
        isMobile && styles.heroButtonWrapperMobile,
        {
          transform: [{ scale }],
          shadowOpacity,
          shadowRadius,
        },
      ]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TouchableOpacity
        style={[styles.heroButton, isMobile && styles.heroButtonMobile]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            styles.heroButtonGlow,
            {
              opacity: glowOpacity,
              transform: [
                { translateX: shinePosition },
                { rotate: "-15deg" },
              ],
            },
          ]}
        />
        <Text style={styles.heroButtonText}>TESTAR GRÁTIS</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* =========================================================
   CARD DA OFERTA
========================================================= */

function OfferCard() {
  const [hovered, setHovered] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loopAnimation: Animated.CompositeAnimation | null = null;

    if (hovered) {
      loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animation, {
            toValue: 0.25,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );
      loopAnimation.start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }

    return () => {
      if (loopAnimation) loopAnimation.stop();
    };
  }, [hovered]);

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.015, 1.03],
  });

  const shadowOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.08, 0.35, 0.75],
  });

  const shadowRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 32],
  });

  const glowOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.18, 0.5],
  });

  const reflectionOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.12, 0.3],
  });

  const reflectionPosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-650, 650],
  });

  const borderColor = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#8f8300", "#ffe500", "#fff27a"],
  });

  return (
    <Animated.View
      style={[
        styles.offerCardWrapper,
        {
          transform: [{ scale }],
          shadowOpacity,
          shadowRadius,
        },
      ]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Animated.View style={[styles.offerCardBorder, { borderColor }]}>
        <View style={styles.offerCard}>
          <Animated.View
            pointerEvents="none"
            style={[styles.offerGlow, { opacity: glowOpacity }]}
          />
          <Animated.View
            pointerEvents="none"
            style={[
              styles.offerReflection,
              {
                opacity: reflectionOpacity,
                transform: [
                  { translateX: reflectionPosition },
                  { rotate: "-15deg" },
                ],
              },
            ]}
          />

          <Text style={styles.offerLabel}>OFERTA ESPECIAL COMPLETA</Text>
          <Text style={styles.offerTitle}>Acesso Completo a +35 Plataformas Criativas</Text>

          <View style={styles.offerPriceRow}>
            <Text style={styles.offerCurrency}>R$</Text>
            <Text style={styles.offerPrice}>10</Text>
          </View>

          <Text style={styles.offerYear}>por ano</Text>
          <Text style={styles.offerDescription}>
            Freepik, Envato, Designi, Shutterstock, Motion Array, Storyblocks e muito mais por apenas R$ 10 ao ano. Teste grátis!
          </Text>

          <TouchableOpacity
            style={styles.offerButton}
            onPress={abrirWhatsApp}
            activeOpacity={0.85}
          >
            <Text style={styles.offerButtonText}>TESTAR GRÁTIS</Text>
          </TouchableOpacity>

          <Text style={styles.offerDisclaimer}>
            R$ 10 por ano • Todas as plataformas inclusas • Acesso Imediato
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

export default function LandingPage() {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <LinearGradient
      colors={[
        "#020611",
        "#061329",
        "#0b1730",
        "#100d27",
        "#050817",
        "#020611",
      ]}
      locations={[0, 0.18, 0.38, 0.58, 0.8, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.page}
    >
      <ScrollView
        contentContainerStyle={[styles.content, { minHeight: "100%" }]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={[styles.headerInner, isMobile && styles.headerInnerMobile]}>
            <AnimatedLogo isMobile={isMobile} />
            <AnimatedHeaderButton onPress={abrirWhatsApp} isMobile={isMobile} />
          </View>
        </View>

        {/* HERO */}
        <View style={[styles.hero, isMobile && styles.heroMobile]}>
          <View style={styles.heroInner}>
            <View style={[styles.specialTag, isMobile && styles.specialTagMobile]}>
              <PulsingDot />
              <Text style={styles.specialTagText}>OFERTA ESPECIAL</Text>
            </View>

            <Text
              style={[
                styles.heroTitle,
                isMobile && styles.heroTitleMobile,
                isTablet && styles.heroTitleTablet,
              ]}
            >
              MAIS DE 35 PLATAFORMAS
            </Text>

            <Text
              style={[
                styles.heroTitle,
                styles.heroTitleSecond,
                isMobile && styles.heroTitleMobile,
                isTablet && styles.heroTitleTablet,
              ]}
            >
              <Text style={styles.yellow}>EM UM SÓ LUGAR</Text>
            </Text>

            <Text
              style={[
                styles.heroTitle,
                styles.heroPriceTitleSameSize,
                isMobile && styles.heroTitleMobile,
                isTablet && styles.heroTitleTablet,
              ]}
            >
              POR APENAS <Text style={styles.yellow}>R$ 10</Text>
            </Text>

            <Text
              style={[
                styles.heroDescription,
                isMobile && styles.heroDescriptionMobile,
              ]}
            >
              Freepik, Envato, Designi, Shutterstock, Motion Array, Storyblocks, Adobe Stock e dezenas de outros bancos por apenas R$ 10 ao ano, com teste grátis.
            </Text>

            <AnimatedHeroButton onPress={abrirWhatsApp} isMobile={isMobile} />

            <Text style={styles.heroDisclaimer}>
              Freepik • Shutterstock • Envato • Designi • Motion Array • Storyblocks e muito mais
            </Text>
          </View>
        </View>

        {/* TODAS AS PLATAFORMAS SOLICITADAS */}
        <View style={styles.section}>
          <View style={styles.sectionInner}>
            <Text style={styles.sectionTitle}>Plataformas Incluídas no Acesso</Text>
            <Text style={styles.sectionSubtitle}>
              Tenha acesso completo a todas as ferramentas abaixo reunidas em uma única assinatura anual por R$ 10.
            </Text>

            <View style={[styles.toolsGrid, isMobile && styles.toolsGridMobile]}>
              <ToolCard icon="ME" name="MotionElements" description="Efeitos, vídeos e templates." type="motionelements" />
              <ToolCard icon="SS" name="Shutterstock" description="Milhões de fotos e imagens em alta." type="shutterstock" />
              <ToolCard icon="DZ" name="Dreamstime" description="Banco de imagens e fotografias." type="dreamstime" />
              <ToolCard icon="IC" name="Iconscout" description="Ícones, ilustrações e 3D." type="iconscout" />
              <ToolCard icon="IV" name="iStock Video HD" description="Vídeos profissionais em alta definição." type="istockvideo" />
              <ToolCard icon="VS" name="VectorStock" description="Vetores exclusivos para design." type="vectorstock" />
              <ToolCard icon="MA" name="Motion Array" description="Templates de vídeo e trilhas." type="motionarray" />
              <ToolCard icon="FP" name="Freepik" description="Vetores, fotos e mockup ilimitados." type="freepik" />
              <ToolCard icon="SB" name="Storyblocks" description="Vídeos, imagens e áudios criativos." type="storyblocks" />
              <ToolCard icon="IS" name="iStockphoto" description="Fotografia e ilustrações globais." type="istockphoto" />
              <ToolCard icon="12" name="123RF" description="Imagens e vetores corporativos." type="rf123" />
              <ToolCard icon="PX" name="Pixeden" description="Mockups e recursos web." type="pixeden" />
              <ToolCard icon="4K" name="SS Video 4K" description="Conteúdos de vídeo em resolução 4K." type="ssvideo4k" />
              <ToolCard icon="HD" name="SS Video HD" description="Vídeos e arquivos em HD." type="ssvideohd" />
              <ToolCard icon="DP" name="Depositphotos" description="Banco de imagens mundial." type="depositphotos" />
              <ToolCard icon="UH" name="UIHut" description="Recursos de UI/UX e design web." type="uihut" />
              <ToolCard icon="DE" name="Designi" description="Ferramenta completa para suas artes." type="designi" />
              <ToolCard icon="U8" name="UI8" description="Designs, UI kits e assets criativos." type="ui8" />
              <ToolCard icon="AS" name="Adobe Stock" description="Imagens e vídeos do ecossistema Adobe." type="adobestock" />
              <ToolCard icon="EN" name="Envato" description="Templates, gráficos e áudios criativos." type="envato" />
              <ToolCard icon="PB" name="PixelBuddha" description="Recursos gráficos e fontes." type="pixelbuddha" />
              <ToolCard icon="MC" name="MockupCloud" description="Mockups realistas de alta qualidade." type="mockupcloud" />
              <ToolCard icon="CF" name="Creative Fabrica" description="Fontes, gráficos e artesanato digital." type="creativefabrica" />
              <ToolCard icon="VE" name="Vecteezy" description="Vetores, ícones e gráficos modernos." type="vecteezy" />
              <ToolCard icon="RP" name="Rawpixel" description="Imagens autênticas e criativas." type="rawpixel" />
              <ToolCard icon="FV" name="Freepik Video" description="Vídeos e filmagens do Freepik." type="freepikvideo" />
              <ToolCard icon="SM" name="SS Music" description="Músicas e trilhas sonoras royalty-free." type="ssmusic" />
              <ToolCard icon="AV" name="Adobe Stock Video" description="Vídeos profissionais Adobe Stock." type="adobestockvideo" />
              <ToolCard icon="FL" name="Flaticon" description="O maior banco de ícones do mundo." type="flaticon" />
              <ToolCard icon="CW" name="Craftwork" description="UI kits, 3D e ilustrações." type="craftwork" />
              <ToolCard icon="AL" name="Alamy" description="Fotografias editoriais e criativas." type="alamy" />
              <ToolCard icon="YI" name="Yellow Images" description="Mockups e embalagens 3D." type="yellowimages" />
              <ToolCard icon="AM" name="Artlist Music/SFX" description="Músicas e efeitos sonoros épicos." type="artlistmusic" />
              <ToolCard icon="ES" name="Epidemic Sound" description="Trilhas sonoras de alta qualidade." type="epidemicsound" />
              <ToolCard icon="AG" name="Artgrid HD" description="Filmagens de cinema em HD/4K." type="artgrid" />
              <ToolCard icon="DZ" name="Deezer" description="Plataforma de áudio e música." type="deezer" />
              <ToolCard icon="AT" name="Artlist Video/Template" description="Templates de vídeo Artlist." type="artlistvideo" />
              <ToolCard icon="FC" name="FootageCrate" description="Efeitos visuais e elementos de vídeo." type="footagecrate" />
            </View>
          </View>
        </View>

        {/* BENEFÍCIOS */}
        <View style={styles.section}>
          <View style={styles.sectionInner}>
            <Text style={styles.sectionTitle}>
              Por que escolher essa oferta?
            </Text>

            <Text style={styles.sectionSubtitle}>
              Economize milhares de reais tendo acesso centralizado a tudo o que você precisa para criar.
            </Text>

            <View
              style={[
                styles.benefitsGrid,
                isMobile && styles.benefitsGridMobile,
                isTablet && styles.benefitsGridTablet,
              ]}
            >
              <Benefit
                icon="F"
                title="Freepik"
                text="Encontre imagens, vetores e recursos gráficos para seus projetos."
                color="#2e78ff"
              />

              <Benefit
                icon="E"
                title="Envato"
                text="Tenha recursos criativos para diferentes tipos de projetos."
                color="#28c77b"
              />

              <Benefit
                icon="D"
                title="Designi"
                text="Acesse materiais para facilitar suas criações e trabalhos."
                color="#9b61ff"
              />

              <Benefit
                icon="✓"
                title="Teste grátis"
                text="Experimente a oferta antes de continuar com o acesso anual."
                color="#18e3a4"
              />
            </View>
          </View>
        </View>

        {/* OFERTA */}
        <View style={styles.offerSection}>
          <OfferCard />
        </View>

        {/* FAQ */}
        <View style={styles.faqSection}>
          <View style={styles.faqInner}>
            <Text style={styles.faqSectionTitle}>Perguntas frequentes</Text>
            <Faq question="Como funciona?" answer="Você entra em contato pelo WhatsApp para receber as informações, testar e liberar o seu acesso completo." />
            <Faq question="Quanto custa?" answer="O acesso a todas as plataformas listadas custa apenas R$ 10 por ano." />
            <Faq question="Quais plataformas estão incluídas?" answer="Todas as +35 plataformas citadas na página, incluindo Shutterstock, Freepik, Envato, Designi, Motion Array e muito mais." />
            <Faq question="Existe teste grátis?" answer="Sim! Você pode testar antes de garantir o seu plano anual." />
            <Faq question="Como faço para contratar?" answer="Basta clicar em qualquer botão da página e falar diretamente com o nosso atendimento no WhatsApp." />
          </View>
        </View>

        {/* FOOTER */}
        <View style={[styles.footer, isMobile && styles.footerMobile]}>
          <View style={styles.footerInner}>
            <AnimatedLogo isFooter={true} isMobile={isMobile} />
            {!isMobile && (
              <View style={[styles.footerInfo, isMobile && styles.footerInfoMobile]}>
                <Text style={styles.footerCopyright}>© 2026 • Todos os direitos reservados</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* =========================================================
   TOOL CARD
========================================================= */

function ToolCard({
  icon,
  name,
  description,
  type,
}: {
  icon: string;
  name: string;
  description: string;
  type: string;
}) {
  const [hovered, setHovered] = useState(false);
  const glow = useRef(new Animated.Value(0)).current;

  const gradientColors: Record<string, readonly [string, string, string]> = {
    freepik: ["#07152f", "#0b2c68", "#2e78ff"],
    envato: ["#061d15", "#075c39", "#28c77b"],
    designi: ["#180b2d", "#4a1c7e", "#9b61ff"],
    shutterstock: ["#2d0b0b", "#7e1c1c", "#ff4b4b"],
    adobestock: ["#2d180b", "#7e4a1c", "#ff9b4b"],
    vecteezy: ["#2d1b0b", "#7e4c1c", "#ff9b18"],
    flaticon: ["#0b222d", "#1c5d7e", "#4bc2ff"],
    motionarray: ["#180b2d", "#5c1c7e", "#c74bff"],
    istock: ["#0b2d24", "#1c7e63", "#4bffca"],
    motionelements: ["#2d180b", "#7e4a1c", "#ff8800"],
    dreamstime: ["#0b1c2d", "#1c527e", "#3399ff"],
    iconscout: ["#1c0b2d", "#631c7e", "#b833ff"],
    istockvideo: ["#0b2d24", "#1c7e63", "#22cc88"],
    vectorstock: ["#2d240b", "#7e631c", "#ffaa00"],
    storyblocks: ["#2d0b1c", "#7e1c52", "#ff3388"],
    istockphoto: ["#0b2d24", "#1c7e63", "#22cc88"],
    rf123: ["#2d130b", "#7e381c", "#ff6622"],
    pixeden: ["#0b272d", "#1c6a7e", "#22b3cc"],
    ssvideo4k: ["#2d0b0b", "#7e1c1c", "#ff4444"],
    ssvideohd: ["#2d0b0b", "#7e1c1c", "#ff4444"],
    depositphotos: ["#0b2d18", "#1c7e3f", "#22cc55"],
    uihut: ["#1c0b2d", "#521c7e", "#9933ff"],
    ui8: ["#2d0b26", "#7e1c63", "#ff33cc"],
    pixelbuddha: ["#2d270b", "#7e6a1c", "#ffcc00"],
    mockupcloud: ["#0b202d", "#1c527e", "#3399ff"],
    creativefabrica: ["#2d0b1c", "#7e1c52", "#ff3399"],
    rawpixel: ["#1c1c1c", "#444444", "#aaaaaa"],
    freepikvideo: ["#07152f", "#0b2c68", "#2e78ff"],
    ssmusic: ["#2d0b0b", "#7e1c1c", "#ff4444"],
    adobestockvideo: ["#2d180b", "#7e4a1c", "#ff9b4b"],
    craftwork: ["#0b2d28", "#1c7e6e", "#22ccaa"],
    alamy: ["#2d220b", "#7e5c1c", "#ffbb00"],
    yellowimages: ["#2d2a0b", "#7e751c", "#ffea00"],
    artlistmusic: ["#0b2d18", "#1c7e3f", "#33ff66"],
    epidemicsound: ["#0b1c2d", "#1c527e", "#3399ff"],
    artgrid: ["#0b2d24", "#1c7e63", "#22cc88"],
    deezer: ["#1b0b2d", "#4b1c7e", "#9933ff"],
    artlistvideo: ["#0b2d18", "#1c7e3f", "#33ff66"],
    footagecrate: ["#2d130b", "#7e381c", "#ff5522"],
  };

  const platformColors: Record<string, string> = {
    freepik: "#2e78ff",
    envato: "#28c77b",
    designi: "#9b61ff",
    shutterstock: "#ff4b4b",
    adobestock: "#ff9b4b",
    vecteezy: "#ff9b18",
    flaticon: "#4bc2ff",
    motionarray: "#c74bff",
    istock: "#4bffca",
    motionelements: "#ff8800",
    dreamstime: "#3399ff",
    iconscout: "#b833ff",
    istockvideo: "#22cc88",
    vectorstock: "#ffaa00",
    storyblocks: "#ff3388",
    istockphoto: "#22cc88",
    rf123: "#ff6622",
    pixeden: "#22b3cc",
    ssvideo4k: "#ff4444",
    ssvideohd: "#ff4444",
    depositphotos: "#22cc55",
    uihut: "#9933ff",
    ui8: "#ff33cc",
    pixelbuddha: "#ffcc00",
    mockupcloud: "#3399ff",
    creativefabrica: "#ff3399",
    rawpixel: "#aaaaaa",
    freepikvideo: "#2e78ff",
    ssmusic: "#ff4444",
    adobestockvideo: "#ff9b4b",
    craftwork: "#22ccaa",
    alamy: "#ffbb00",
    yellowimages: "#ffea00",
    artlistmusic: "#33ff66",
    epidemicsound: "#3399ff",
    artgrid: "#22cc88",
    deezer: "#9933ff",
    artlistvideo: "#33ff66",
    footagecrate: "#ff5522",
  };

  const activeColor = platformColors[type] || "#2e78ff";
  const activeGradient = gradientColors[type] || ["#101b2b", "#101b2b", "#101b2b"];

  useEffect(() => {
    let loopAnimation: Animated.CompositeAnimation | null = null;

    if (hovered) {
      loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glow, {
            toValue: 1,
            duration: 3200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(glow, {
            toValue: 0.25,
            duration: 3200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );
      loopAnimation.start();
    } else {
      Animated.timing(glow, {
        toValue: 0,
        duration: 1400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }

    return () => {
      if (loopAnimation) loopAnimation.stop();
    };
  }, [hovered]);

  const scale = glow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.018, 1.035],
  });

  const shadowOpacity = glow.interpolate({
    inputRange: [0, 0.4, 0.75, 1],
    outputRange: [0, 0.15, 0.45, 0.75],
  });

  const shadowRadius = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 35],
  });

  const glowOpacity = glow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.25, 0.7],
  });

  const reflectionOpacity = glow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.12, 0.3],
  });

  return (
    <Animated.View
      style={[
        styles.toolCardWrapper,
        {
          transform: [{ scale }],
          shadowColor: activeColor,
          shadowOpacity,
          shadowRadius,
        },
      ]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <LinearGradient
        colors={hovered ? activeGradient : ["#101b2b", "#101b2b", "#101b2b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.toolCard}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toolGlow,
            {
              opacity: glowOpacity,
              backgroundColor: activeColor,
            },
          ]}
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.toolReflection, { opacity: reflectionOpacity }]}
        />

        <View style={[styles.toolIconBox, { backgroundColor: activeColor + "33" }]}>
          <Text style={[styles.toolIcon, { color: activeColor }]}>{icon}</Text>
        </View>

        <Text style={styles.toolName}>{name}</Text>
        <Text style={styles.toolDescription}>{description}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

/* =========================================================
   BENEFIT
========================================================= */

function Benefit({
  icon,
  title,
  text,
  color,
}: {
  icon: string;
  title: string;
  text: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loopAnimation: Animated.CompositeAnimation | null = null;

    if (hovered) {
      loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glow, {
            toValue: 1,
            duration: 3200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(glow, {
            toValue: 0.25,
            duration: 3200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );
      loopAnimation.start();
    } else {
      Animated.timing(glow, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }

    return () => {
      if (loopAnimation) loopAnimation.stop();
    };
  }, [hovered]);

  const scale = glow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.012, 1.025],
  });

  const shadowOpacity = glow.interpolate({
    inputRange: [0, 0.4, 0.75, 1],
    outputRange: [0, 0.12, 0.3, 0.55],
  });

  const shadowRadius = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 28],
  });

  const glowOpacity = glow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.35, 0.7],
  });

  const reflectionOpacity = glow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.08, 0.22],
  });

  return (
    <Animated.View
      style={[
        styles.benefitCardWrapper,
        {
          transform: [{ scale }],
          shadowColor: color,
          shadowOpacity,
          shadowRadius,
        },
      ]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <View style={styles.benefitCard}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.benefitGlow,
            {
              opacity: glowOpacity,
              backgroundColor: color,
            },
          ]}
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.benefitReflection, { opacity: reflectionOpacity }]}
        />

        <View
          style={[
            styles.benefitIconBox,
            { backgroundColor: hovered ? color : "#142239" },
          ]}
        >
          <Text style={styles.benefitIcon}>{icon}</Text>
        </View>

        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitText}>{text}</Text>
      </View>
    </Animated.View>
  );
}

/* =========================================================
   FAQ
========================================================= */

function Faq({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.faq, open && styles.faqOpen]}
      onPress={() => setOpen((previous) => !previous)}
      activeOpacity={0.8}
    >
      <View style={styles.faqHeader}>
        <View style={styles.faqArrowBox}>
          <Text style={styles.faqArrow}>{open ? "⌄" : "›"}</Text>
        </View>
        <Text style={styles.faqQuestion}>{question}</Text>
      </View>

      {open && <Text style={styles.faqAnswer}>{answer}</Text>}
    </TouchableOpacity>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { backgroundColor: "transparent" },

  loadingScreen: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingSpinnerOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "rgba(255, 229, 0, 0.16)",
    borderTopColor: "#ffe500",
    borderRightColor: "#18e3a4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ffe500",
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  loadingSpinnerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#18e3a4",
    shadowColor: "#18e3a4",
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 8,
  },
  loadingLogo: { color: "#ffffff", fontSize: 23, fontWeight: "900", marginTop: 25 },
  loadingText: { color: "#718096", fontSize: 14, fontWeight: "600", marginTop: 9 },

  header: {
    width: "100%",
    height: 92,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(60, 83, 120, 0.45)",
  },
  headerInner: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 0,
    paddingRight: 35,
  },
  headerInnerMobile: { 
    justifyContent: "center", 
    paddingRight: 0,
    paddingLeft: 0,
  },
  logoImage: { width: 420, height: 130, marginLeft: -120 },
  mobileLogoContainer: { 
    marginLeft: 0, 
    alignItems: "center", 
    justifyContent: "center",
    width: "100%",
  },
  mobileLogoImage: { 
    width: 240, 
    height: 80, 
    marginLeft: 0,
  },

  headerButtonWrapper: {
    borderRadius: 14,
    marginRight: 16,
    shadowColor: "#18e3a4",
    elevation: 7,
  },
  headerButton: {
    backgroundColor: "#18e3a4",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  headerButtonGlow: {
    position: "absolute",
    width: 35,
    height: "220%",
    top: "-60%",
    left: 0,
    backgroundColor: "#ffffff",
    borderRadius: 30,
  },
  headerButtonText: { color: "#03100c", fontSize: 17, fontWeight: "900", zIndex: 2 },

  hero: {
    width: "100%",
    minHeight: 650,
    backgroundColor: "transparent",
    alignItems: "center",
    paddingTop: 73,
    paddingBottom: 75,
  },
  heroMobile: { minHeight: 570, paddingTop: 45, paddingHorizontal: 20, paddingBottom: 55 },
  heroInner: { width: "100%", maxWidth: 1408, alignItems: "center" },

  specialTag: {
    borderWidth: 1,
    borderColor: "#00d99c",
    backgroundColor: "rgba(6, 27, 26, 0.75)",
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  specialTagMobile: {
    marginBottom: 12,
  },
  specialTagText: { color: "#13e4a3", fontSize: 14, fontWeight: "900" },
  pulsingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#13e4a3",
    marginRight: 9,
    shadowColor: "#13e4a3",
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 6,
  },

  heroTitle: {
    color: "#f8fafc",
    textAlign: "center",
    fontSize: 62,
    lineHeight: 68,
    fontWeight: "900",
    letterSpacing: -2.2,
    marginTop: 28,
  },
  heroTitleSecond: { marginTop: 0 },
  heroPriceTitleSameSize: { marginTop: 8 },
  heroTitleMobile: { fontSize: 26, lineHeight: 30, letterSpacing: -1, marginTop: 10 },
  heroTitleTablet: { fontSize: 46, lineHeight: 50 },
  yellow: { color: "#ffe500" },

  heroDescription: {
    color: "#aebdd3",
    textAlign: "center",
    fontSize: 21,
    lineHeight: 35,
    maxWidth: 900,
    marginTop: 23,
  },
  heroDescriptionMobile: { fontSize: 14, lineHeight: 22, maxWidth: 350, marginTop: 14 },

  heroButtonWrapper: {
    minWidth: 405,
    marginTop: 38,
    borderRadius: 16,
    shadowColor: "#ffe500",
    elevation: 10,
  },
  heroButtonWrapperMobile: {
    minWidth: "auto",
    width: "100%",
    maxWidth: 340,
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  heroButton: {
    backgroundColor: "#ffd500",
    paddingHorizontal: 35,
    paddingVertical: 20,
    minWidth: 405,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroButtonMobile: {
    minWidth: "auto",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  heroButtonGlow: {
    position: "absolute",
    width: 80,
    height: "220%",
    top: "-60%",
    left: 0,
    backgroundColor: "#ffffff",
    borderRadius: 40,
  },
  heroButtonText: { color: "#111827", fontSize: 18, fontWeight: "900", textAlign: "center", zIndex: 2 },
  heroDisclaimer: { color: "#718096", fontSize: 14, textAlign: "center", marginTop: 24, paddingHorizontal: 20 },

  section: { width: "100%", backgroundColor: "transparent", paddingTop: 68, paddingBottom: 90, paddingHorizontal: 20 },
  sectionInner: { width: "100%", maxWidth: 1450, alignSelf: "center" },
  sectionTitle: { color: "#f8fafc", textAlign: "center", fontSize: 42, lineHeight: 50, fontWeight: "900", letterSpacing: -1.3 },
  sectionSubtitle: { color: "#9aafd0", textAlign: "center", fontSize: 19, lineHeight: 27, maxWidth: 800, alignSelf: "center", marginTop: 14 },

  toolsGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 18,
    marginTop: 38,
  },
  toolsGridMobile: { gap: 12 },

  toolCardWrapper: { width: 310, minHeight: 230, borderRadius: 22 },
  toolCard: {
    width: "100%",
    minHeight: 230,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 25,
    overflow: "hidden",
  },
  toolGlow: { position: "absolute", width: 250, height: 250, borderRadius: 125, top: -130, right: -80 },
  toolReflection: {
    position: "absolute",
    width: "140%",
    height: 80,
    top: -35,
    left: -20,
    backgroundColor: "#ffffff",
    transform: [{ rotate: "-12deg" }],
  },
  toolIconBox: { width: 58, height: 58, borderRadius: 16, alignItems: "center", justifyContent: "center", marginBottom: 17 },
  toolIcon: { fontSize: 20, fontWeight: "900" },
  toolName: { color: "#ffffff", fontSize: 20, fontWeight: "900", textAlign: "center" },
  toolDescription: { color: "#aec0dc", fontSize: 14, lineHeight: 21, textAlign: "center", marginTop: 10, maxWidth: 240 },

  benefitsGrid: { width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "stretch", gap: 20, marginTop: 38, paddingHorizontal: 35 },
  benefitsGridTablet: { flexWrap: "wrap", paddingHorizontal: 80, gap: 20 },
  benefitsGridMobile: { flexDirection: "column", alignItems: "center", gap: 12, paddingHorizontal: 0 },

  benefitCardWrapper: { width: 300, minHeight: 185, borderRadius: 20, elevation: 5 },
  benefitCard: {
    width: "100%",
    minHeight: 185,
    backgroundColor: "rgba(9, 19, 33, 0.88)",
    borderWidth: 1,
    borderColor: "#233247",
    borderRadius: 20,
    padding: 25,
    overflow: "hidden",
  },
  benefitGlow: { position: "absolute", width: 300, height: 300, borderRadius: 150, top: -170, right: -100 },
  benefitReflection: {
    position: "absolute",
    width: "150%",
    height: 70,
    top: -30,
    left: -50,
    backgroundColor: "#ffffff",
    transform: [{ rotate: "-12deg" }],
  },
  benefitIconBox: { width: 43, height: 43, borderRadius: 12, backgroundColor: "#142239", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  benefitIcon: { color: "#ffffff", fontSize: 20, fontWeight: "900" },
  benefitTitle: { color: "#ffffff", fontSize: 20, fontWeight: "900" },
  benefitText: { color: "#a9bdd9", fontSize: 15, lineHeight: 23, marginTop: 10 },

  offerSection: { width: "100%", backgroundColor: "transparent", paddingTop: 5, paddingBottom: 25, paddingHorizontal: 20 },
  offerCardWrapper: { width: "100%", maxWidth: 760, alignSelf: "center", borderRadius: 27, shadowColor: "#ffe500", elevation: 12 },
  offerCardBorder: { width: "100%", borderWidth: 2, borderRadius: 27, overflow: "hidden" },
  offerCard: {
    width: "100%",
    backgroundColor: "rgba(17, 28, 44, 0.94)",
    borderRadius: 25,
    paddingVertical: 45,
    paddingHorizontal: 40,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  offerGlow: { position: "absolute", width: 500, height: 500, borderRadius: 250, top: -330, left: "50%", marginLeft: -250, backgroundColor: "#ffe500" },
  offerReflection: { position: "absolute", width: 95, height: "180%", top: "-40%", left: 0, backgroundColor: "#ffffff", borderRadius: 50, zIndex: 1 },
  offerLabel: { color: "#8796ae", fontSize: 13, fontWeight: "900", letterSpacing: 1.5, zIndex: 2 },
  offerTitle: { color: "#ffffff", textAlign: "center", fontSize: 24, fontWeight: "900", marginTop: 10, zIndex: 2 },
  offerPriceRow: { flexDirection: "row", alignItems: "baseline", justifyContent: "center", marginTop: 3, zIndex: 2 },
  offerCurrency: { color: "#ffe500", fontSize: 30, lineHeight: 40, fontWeight: "900", marginRight: 7 },
  offerPrice: { color: "#ffe500", fontSize: 80, lineHeight: 90, fontWeight: "900" },
  offerYear: { color: "#ffe500", fontSize: 18, fontWeight: "900", marginTop: -3, zIndex: 2 },
  offerDescription: { color: "#9eb0cb", fontSize: 16, textAlign: "center", maxWidth: 500, lineHeight: 24, marginTop: 12, zIndex: 2 },
  offerButton: { backgroundColor: "#ffe000", paddingHorizontal: 35, paddingVertical: 16, borderRadius: 12, marginTop: 25, zIndex: 3 },
  offerButtonText: { color: "#121212", fontSize: 16, fontWeight: "900" },
  offerDisclaimer: { color: "#5d6b7f", fontSize: 12, marginTop: 13, textAlign: "center", zIndex: 2 },

  faqSection: { width: "100%", backgroundColor: "transparent", paddingHorizontal: 20, paddingTop: 15, paddingBottom: 90 },
  faqInner: { width: "100%", maxWidth: 760, alignSelf: "center" },
  faqSectionTitle: { color: "#f8fafc", textAlign: "center", fontSize: 42, lineHeight: 50, fontWeight: "900", letterSpacing: -1.3, marginBottom: 28 },
  faq: {
    width: "100%",
    backgroundColor: "rgba(9, 19, 33, 0.88)",
    borderWidth: 1,
    borderColor: "#243147",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 19,
    marginTop: 12,
  },
  faqOpen: { borderColor: "#34445e" },
  faqHeader: { width: "100%", flexDirection: "row", alignItems: "center" },
  faqArrowBox: { width: 25, height: 29, marginRight: 8, flexShrink: 0, alignItems: "flex-start", justifyContent: "center" },
  faqArrow: { color: "#ffffff", fontSize: 25, lineHeight: 25, fontWeight: "400", width: 25, height: 25, textAlign: "left", includeFontPadding: false, flexShrink: 0 },
  faqQuestion: { color: "#ffffff", fontSize: 15, fontWeight: "900", flex: 1 },
  faqAnswer: { color: "#8294af", fontSize: 14, lineHeight: 21, marginTop: 13, marginLeft: 33, paddingRight: 10 },

  footer: {
    width: "100%",
    height: 160,
    backgroundColor: "transparent",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(60, 83, 120, 0.45)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footerMobile: {
    height: 70,
    justifyContent: "center",
    paddingBottom: 0,
  },
  footerInner: { width: "100%", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 20 },
  footerLogoContainer: { alignItems: "center", justifyContent: "center", marginTop: -32 },
  footerLogoImage: { marginLeft: 0, width: 580, height: 180 },
  footerInfo: { alignItems: "center", marginTop: -25 },
  footerInfoMobile: { marginTop: 0 },
  footerCopyright: { color: "#414e62", fontSize: 12, textAlign: "center", marginTop: 0 },
});