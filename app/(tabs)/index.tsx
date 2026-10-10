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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WHATSAPP = "557382372249";

const abrirWhatsApp = () => {
  const mensagem = encodeURIComponent(
    "Olá! Tenho interesse no acesso ao Freepik + Envato + Designi por R$ 10 ao ano e gostaria de saber sobre o teste grátis."
  );

  Linking.openURL(
    `https://wa.me/${WHATSAPP}?text=${mensagem}`
  );
};

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
}: {
  onPress: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const animation = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    let loopAnimation:
      | Animated.CompositeAnimation
      | null = null;

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
      if (loopAnimation) {
        loopAnimation.stop();
      }
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

        <Text style={styles.headerButtonText}>
          Ver oferta
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* =========================================================
   BOTÃO PRINCIPAL
========================================================= */

function AnimatedHeroButton({
  onPress,
}: {
  onPress: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const animation = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    let loopAnimation:
      | Animated.CompositeAnimation
      | null = null;

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
      if (loopAnimation) {
        loopAnimation.stop();
      }
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
        style={styles.heroButton}
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

        <Text style={styles.heroButtonText}>
          TESTAR GRÁTIS POR R$10 →
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* =========================================================
   CARD DA OFERTA
========================================================= */

function OfferCard() {
  const [hovered, setHovered] = useState(false);

  const animation = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    let loopAnimation:
      | Animated.CompositeAnimation
      | null = null;

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
      if (loopAnimation) {
        loopAnimation.stop();
      }
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
    outputRange: [
      "#8f8300",
      "#ffe500",
      "#fff27a",
    ],
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
      <Animated.View
        style={[
          styles.offerCardBorder,
          {
            borderColor,
          },
        ]}
      >
        <View style={styles.offerCard}>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.offerGlow,
              {
                opacity: glowOpacity,
              },
            ]}
          />

          <Animated.View
            pointerEvents="none"
            style={[
              styles.offerReflection,
              {
                opacity: reflectionOpacity,
                transform: [
                  {
                    translateX:
                      reflectionPosition,
                  },
                  {
                    rotate: "-15deg",
                  },
                ],
              },
            ]}
          />

          <Text style={styles.offerLabel}>
            OFERTA ESPECIAL
          </Text>

          <Text style={styles.offerTitle}>
            Freepik + Envato + Designi
          </Text>

          <View style={styles.offerPriceRow}>
            <Text style={styles.offerCurrency}>
              R$
            </Text>

            <Text style={styles.offerPrice}>
              10
            </Text>
          </View>

          <Text style={styles.offerYear}>
            por ano
          </Text>

          <Text style={styles.offerDescription}>
            Acesso ao Freepik, Envato e Designi por apenas
            R$ 10 ao ano. Comece com teste grátis.
          </Text>

          <TouchableOpacity
            style={styles.offerButton}
            onPress={abrirWhatsApp}
            activeOpacity={0.85}
          >
            <Text style={styles.offerButtonText}>
              TESTAR GRÁTIS
            </Text>
          </TouchableOpacity>

          <Text style={styles.offerDisclaimer}>
            R$ 10 por ano • Freepik • Envato • Designi
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

  const isTablet =
    width >= 768 &&
    width < 1200;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
    };
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
      locations={[
        0,
        0.18,
        0.38,
        0.58,
        0.8,
        1,
      ]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={styles.page}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}

        <View style={styles.header}>
          <View
            style={[
              styles.headerInner,
              isMobile &&
                styles.headerInnerMobile,
            ]}
          >
            <Image
              source={require("../../assets/images/aaa.png")}
              style={styles.logoImage}
              resizeMode="contain"
              accessibilityLabel="Logo Conect Designer"
            />

            <AnimatedHeaderButton
              onPress={abrirWhatsApp}
            />
          </View>
        </View>

        {/* HERO */}

        <View
          style={[
            styles.hero,
            isMobile &&
              styles.heroMobile,
          ]}
        >
          <View style={styles.heroInner}>
            <View style={styles.specialTag}>
              <PulsingDot />

              <Text style={styles.specialTagText}>
                OFERTA ESPECIAL
              </Text>
            </View>

            <Text
              style={[
                styles.heroTitle,
                isMobile &&
                  styles.heroTitleMobile,
                isTablet &&
                  styles.heroTitleTablet,
              ]}
            >
              FREEPIK + ENVATO +
            </Text>

            <Text
              style={[
                styles.heroTitle,
                styles.heroTitleSecond,
                isMobile &&
                  styles.heroTitleMobile,
                isTablet &&
                  styles.heroTitleTablet,
              ]}
            >
              <Text style={styles.yellow}>
                DESIGNI
              </Text>
            </Text>

            {/* MESMO TAMANHO DO TÍTULO PRINCIPAL */}

            <Text
              style={[
                styles.heroTitle,
                styles.heroPriceTitleSameSize,
                isMobile &&
                  styles.heroTitleMobile,
                isTablet &&
                  styles.heroTitleTablet,
              ]}
            >
              POR APENAS{" "}
              <Text style={styles.yellow}>
                R$ 10
              </Text>
            </Text>

            <Text
              style={[
                styles.heroDescription,
                isMobile &&
                  styles.heroDescriptionMobile,
              ]}
            >
              Tenha acesso ao Freepik, Envato e Designi por
              apenas R$ 10 ao ano, com teste grátis.
            </Text>

            <AnimatedHeroButton
              onPress={abrirWhatsApp}
            />

            <Text style={styles.heroDisclaimer}>
              Freepik • Envato • Designi • Acesso anual
            </Text>
          </View>
        </View>

        {/* FERRAMENTAS */}

        <View style={styles.section}>
          <View style={styles.sectionInner}>
            <Text style={styles.sectionTitle}>
              Freepik, Envato e Designi
            </Text>

            <Text style={styles.sectionSubtitle}>
              Três plataformas reunidas em uma única oferta
              por apenas R$ 10 ao ano.
            </Text>

            <View
              style={[
                styles.toolsGrid,
                isMobile &&
                  styles.toolsGridMobile,
              ]}
            >
              <ToolCard
                icon="F"
                name="Freepik"
                description="Recursos gráficos, imagens, vetores e materiais para seus projetos."
                type="freepik"
              />

              <ToolCard
                icon="E"
                name="Envato"
                description="Recursos criativos para design, vídeos, apresentações e conteúdo."
                type="envato"
              />

              <ToolCard
                icon="D"
                name="Designi"
                description="Recursos e materiais para facilitar seus trabalhos de criação."
                type="designi"
              />
            </View>
          </View>
        </View>

        {/* BENEFÍCIOS */}

        <View style={styles.section}>
          <View style={styles.sectionInner}>
            <Text style={styles.sectionTitle}>
              Por que usar essa oferta?
            </Text>

            <Text style={styles.sectionSubtitle}>
              Tenha Freepik, Envato e Designi reunidos
              por apenas R$ 10 ao ano.
            </Text>

            <View
              style={[
                styles.benefitsGrid,
                isMobile &&
                  styles.benefitsGridMobile,
                isTablet &&
                  styles.benefitsGridTablet,
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
            <Text style={styles.faqSectionTitle}>
              Perguntas frequentes
            </Text>

            <Faq
              question="Como funciona?"
              answer="Você entra em contato pelo WhatsApp para receber as informações e iniciar o teste grátis."
            />

            <Faq
              question="Quanto custa?"
              answer="A oferta custa apenas R$ 10 por ano."
            />

            <Faq
              question="Quais plataformas estão incluídas?"
              answer="Freepik, Envato e Designi."
            />

            <Faq
              question="Existe teste grátis?"
              answer="Sim. A oferta possui opção de teste grátis. As condições são informadas durante o atendimento."
            />

            <Faq
              question="Como faço para contratar?"
              answer="Clique em qualquer botão da página e fale com o atendimento pelo WhatsApp."
            />
          </View>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>
            Conect Designer
          </Text>

          <Text style={styles.footerText}>
          </Text>

          <Text style={styles.footerCopyright}>
            © 2026 • Todos os direitos reservados
          </Text>
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
  type:
    | "freepik"
    | "envato"
    | "designi";
}) {
  const [hovered, setHovered] = useState(false);

  const glow = useRef(
    new Animated.Value(0)
  ).current;

  const gradientColors = {
    freepik: [
      "#07152f",
      "#0b2c68",
      "#2e78ff",
    ],

    envato: [
      "#061d15",
      "#075c39",
      "#28c77b",
    ],

    designi: [
      "#180b2d",
      "#4a1c7e",
      "#9b61ff",
    ],
  } as const;

  const platformColor = {
    freepik: "#2e78ff",
    envato: "#28c77b",
    designi: "#9b61ff",
  } as const;

  useEffect(() => {
    let loopAnimation:
      | Animated.CompositeAnimation
      | null = null;

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
      if (loopAnimation) {
        loopAnimation.stop();
      }
    };
  }, [hovered]);

  const scale = glow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.018, 1.035],
  });

  const shadowOpacity = glow.interpolate({
    inputRange: [
      0,
      0.4,
      0.75,
      1,
    ],
    outputRange: [
      0,
      0.15,
      0.45,
      0.75,
    ],
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

          shadowColor:
            platformColor[type],

          shadowOpacity,

          shadowRadius,
        },
      ]}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
    >
      <LinearGradient
        colors={
          hovered
            ? gradientColors[type]
            : [
                "#101b2b",
                "#101b2b",
                "#101b2b",
              ]
        }
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.toolCard}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toolGlow,
            {
              opacity: glowOpacity,
              backgroundColor:
                platformColor[type],
            },
          ]}
        />

        <Animated.View
          pointerEvents="none"
          style={[
            styles.toolReflection,
            {
              opacity:
                reflectionOpacity,
            },
          ]}
        />

        <View
          style={[
            styles.toolIconBox,

            type === "freepik" &&
              styles.freepikIcon,

            type === "envato" &&
              styles.envatoIcon,

            type === "designi" &&
              styles.designiIcon,
          ]}
        >
          <Text style={styles.toolIcon}>
            {icon}
          </Text>
        </View>

        <Text style={styles.toolName}>
          {name}
        </Text>

        <Text style={styles.toolDescription}>
          {description}
        </Text>
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

  const glow = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    let loopAnimation:
      | Animated.CompositeAnimation
      | null = null;

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
      if (loopAnimation) {
        loopAnimation.stop();
      }
    };
  }, [hovered]);

  const scale = glow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.012, 1.025],
  });

  const shadowOpacity = glow.interpolate({
    inputRange: [
      0,
      0.4,
      0.75,
      1,
    ],
    outputRange: [
      0,
      0.12,
      0.3,
      0.55,
    ],
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
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
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
          style={[
            styles.benefitReflection,
            {
              opacity:
                reflectionOpacity,
            },
          ]}
        />

        <View
          style={[
            styles.benefitIconBox,
            {
              backgroundColor:
                hovered
                  ? color
                  : "#142239",
            },
          ]}
        >
          <Text style={styles.benefitIcon}>
            {icon}
          </Text>
        </View>

        <Text style={styles.benefitTitle}>
          {title}
        </Text>

        <Text style={styles.benefitText}>
          {text}
        </Text>
      </View>
    </Animated.View>
  );
}

/* =========================================================
   FAQ
========================================================= */

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.faq,
        open && styles.faqOpen,
      ]}
      onPress={() =>
        setOpen((previous) => !previous)
      }
      activeOpacity={0.8}
    >
      <View style={styles.faqHeader}>
        <View style={styles.faqArrowBox}>
          <Text style={styles.faqArrow}>
            {open ? "⌄" : "›"}
          </Text>
        </View>

        <Text style={styles.faqQuestion}>
          {question}
        </Text>
      </View>

      {open && (
        <Text style={styles.faqAnswer}>
          {answer}
        </Text>
      )}
    </TouchableOpacity>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  content: {
    backgroundColor: "transparent",
  },

  /* LOADING */

  loadingScreen: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  loadingSpinnerOuter: {
    width: 64,
    height: 64,

    borderRadius: 32,

    borderWidth: 4,

    borderColor:
      "rgba(255, 229, 0, 0.16)",

    borderTopColor: "#ffe500",

    borderRightColor: "#18e3a4",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#ffe500",

    shadowOpacity: 0.5,
    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 0,
    },

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

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 8,
  },

  loadingLogo: {
    color: "#ffffff",

    fontSize: 23,

    fontWeight: "900",

    marginTop: 25,
  },

  loadingText: {
    color: "#718096",

    fontSize: 14,

    fontWeight: "600",

    marginTop: 9,
  },

  /* HEADER */

  header: {
    width: "100%",
    height: 92,

    backgroundColor: "transparent",

    borderBottomWidth: 1,
    borderBottomColor:
      "rgba(60, 83, 120, 0.45)",
  },

  headerInner: {
    width: "100%",
    maxWidth: 1408,
    height: "100%",

    alignSelf: "center",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 25,
  },

  headerInnerMobile: {
    paddingHorizontal: 20,
  },

  logoImage: {
    width: 380,
    height: 120,
    maxWidth: "75%",
    marginLeft: -80,
  },

  /* BOTÃO VER OFERTA */

  headerButtonWrapper: {
    borderRadius: 14,

    shadowColor: "#18e3a4",

    shadowOffset: {
      width: 0,
      height: 0,
    },

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

  headerButtonText: {
    color: "#03100c",

    fontSize: 17,
    fontWeight: "900",

    zIndex: 2,
  },

  /* HERO */

  hero: {
    width: "100%",
    minHeight: 650,

    backgroundColor: "transparent",

    alignItems: "center",

    paddingTop: 73,
    paddingBottom: 75,
  },

  heroMobile: {
    minHeight: 570,

    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 55,
  },

  heroInner: {
    width: "100%",
    maxWidth: 1408,

    alignItems: "center",
  },

  specialTag: {
    borderWidth: 1,
    borderColor: "#00d99c",

    backgroundColor:
      "rgba(6, 27, 26, 0.75)",

    paddingHorizontal: 20,
    paddingVertical: 11,

    borderRadius: 30,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  specialTagText: {
    color: "#13e4a3",

    fontSize: 14,
    fontWeight: "900",
  },

  pulsingDot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#13e4a3",

    marginRight: 9,

    shadowColor: "#13e4a3",

    shadowOpacity: 0.9,
    shadowRadius: 9,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 6,
  },

  heroTitle: {
    color: "#f8fafc",

    textAlign: "center",

    fontSize: 82,
    lineHeight: 88,

    fontWeight: "900",

    letterSpacing: -3,

    marginTop: 28,
  },

  heroTitleSecond: {
    marginTop: 0,
  },

  /* POR APENAS R$ 10 NO MESMO TAMANHO */

  heroPriceTitleSameSize: {
    marginTop: 8,
  },

  heroTitleMobile: {
    fontSize: 39,
    lineHeight: 42,

    letterSpacing: -1.5,

    marginTop: 17,
  },

  heroTitleTablet: {
    fontSize: 64,
    lineHeight: 68,
  },

  yellow: {
    color: "#ffe500",
  },

  heroDescription: {
    color: "#aebdd3",

    textAlign: "center",

    fontSize: 21,
    lineHeight: 35,

    maxWidth: 900,

    marginTop: 23,
  },

  heroDescriptionMobile: {
    fontSize: 14,
    lineHeight: 22,

    maxWidth: 350,

    marginTop: 18,
  },

  /* BOTÃO HERO */

  heroButtonWrapper: {
    minWidth: 405,

    marginTop: 38,

    borderRadius: 16,

    shadowColor: "#ffe500",

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 10,
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

  heroButtonGlow: {
    position: "absolute",

    width: 80,
    height: "220%",

    top: "-60%",
    left: 0,

    backgroundColor: "#ffffff",

    borderRadius: 40,
  },

  heroButtonText: {
    color: "#111827",

    fontSize: 18,
    fontWeight: "900",

    textAlign: "center",

    zIndex: 2,
  },

  heroDisclaimer: {
    color: "#718096",

    fontSize: 14,

    textAlign: "center",

    marginTop: 24,
  },

  /* SEÇÕES */

  section: {
    width: "100%",

    backgroundColor: "transparent",

    paddingTop: 68,
    paddingBottom: 90,

    paddingHorizontal: 20,
  },

  sectionInner: {
    width: "100%",
    maxWidth: 1450,

    alignSelf: "center",
  },

  sectionTitle: {
    color: "#f8fafc",

    textAlign: "center",

    fontSize: 42,
    lineHeight: 50,

    fontWeight: "900",

    letterSpacing: -1.3,
  },

  sectionSubtitle: {
    color: "#9aafd0",

    textAlign: "center",

    fontSize: 19,
    lineHeight: 27,

    maxWidth: 800,

    alignSelf: "center",

    marginTop: 14,
  },

  /* TOOLS */

  toolsGrid: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "stretch",

    gap: 18,

    marginTop: 38,
  },

  toolsGridMobile: {
    flexWrap: "wrap",

    gap: 12,
  },

  toolCardWrapper: {
    width: 310,
    minHeight: 230,

    borderRadius: 22,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 0,
  },

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

  toolGlow: {
    position: "absolute",

    width: 250,
    height: 250,

    borderRadius: 125,

    top: -130,
    right: -80,
  },

  toolReflection: {
    position: "absolute",

    width: "140%",
    height: 80,

    top: -35,
    left: -20,

    backgroundColor: "#ffffff",

    transform: [
      {
        rotate: "-12deg",
      },
    ],
  },

  toolIconBox: {
    width: 58,
    height: 58,

    borderRadius: 16,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 17,
  },

  freepikIcon: {
    backgroundColor: "#143b82",
  },

  envatoIcon: {
    backgroundColor: "#124c37",
  },

  designiIcon: {
    backgroundColor: "#402070",
  },

  toolIcon: {
    color: "#ffffff",

    fontSize: 28,

    fontWeight: "900",
  },

  toolName: {
    color: "#ffffff",

    fontSize: 21,

    fontWeight: "900",

    textAlign: "center",
  },

  toolDescription: {
    color: "#aec0dc",

    fontSize: 15,
    lineHeight: 23,

    textAlign: "center",

    marginTop: 10,

    maxWidth: 240,
  },

  /* BENEFÍCIOS */

  benefitsGrid: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "stretch",

    gap: 20,

    marginTop: 38,

    paddingHorizontal: 35,
  },

  benefitsGridTablet: {
    flexWrap: "wrap",

    paddingHorizontal: 80,

    gap: 20,
  },

  benefitsGridMobile: {
    flexDirection: "column",

    alignItems: "center",

    gap: 12,

    paddingHorizontal: 0,
  },

  benefitCardWrapper: {
    width: 300,

    minHeight: 185,

    borderRadius: 20,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 5,
  },

  benefitCard: {
    width: "100%",

    minHeight: 185,

    backgroundColor:
      "rgba(9, 19, 33, 0.88)",

    borderWidth: 1,
    borderColor: "#233247",

    borderRadius: 20,

    padding: 25,

    overflow: "hidden",
  },

  benefitGlow: {
    position: "absolute",

    width: 300,
    height: 300,

    borderRadius: 150,

    top: -170,
    right: -100,
  },

  benefitReflection: {
    position: "absolute",

    width: "150%",
    height: 70,

    top: -30,
    left: -50,

    backgroundColor: "#ffffff",

    transform: [
      {
        rotate: "-12deg",
      },
    ],
  },

  benefitIconBox: {
    width: 43,
    height: 43,

    borderRadius: 12,

    backgroundColor: "#142239",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 14,
  },

  benefitIcon: {
    color: "#ffffff",

    fontSize: 20,

    fontWeight: "900",
  },

  benefitTitle: {
    color: "#ffffff",

    fontSize: 20,

    fontWeight: "900",
  },

  benefitText: {
    color: "#a9bdd9",

    fontSize: 15,
    lineHeight: 23,

    marginTop: 10,
  },

  /* OFERTA */

  offerSection: {
    width: "100%",

    backgroundColor: "transparent",

    paddingTop: 5,
    paddingBottom: 25,

    paddingHorizontal: 20,
  },

  offerCardWrapper: {
    width: "100%",
    maxWidth: 760,

    alignSelf: "center",

    borderRadius: 27,

    shadowColor: "#ffe500",

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 12,
  },

  offerCardBorder: {
    width: "100%",

    borderWidth: 2,

    borderRadius: 27,

    overflow: "hidden",
  },

  offerCard: {
    width: "100%",

    backgroundColor:
      "rgba(17, 28, 44, 0.94)",

    borderRadius: 25,

    paddingVertical: 45,
    paddingHorizontal: 40,

    alignItems: "center",

    overflow: "hidden",

    position: "relative",
  },

  offerGlow: {
    position: "absolute",

    width: 500,
    height: 500,

    borderRadius: 250,

    top: -330,
    left: "50%",

    marginLeft: -250,

    backgroundColor: "#ffe500",
  },

  offerReflection: {
    position: "absolute",

    width: 95,
    height: "180%",

    top: "-40%",

    left: 0,

    backgroundColor: "#ffffff",

    borderRadius: 50,

    zIndex: 1,
  },

  offerLabel: {
    color: "#8796ae",

    fontSize: 13,
    fontWeight: "900",

    letterSpacing: 1.5,

    zIndex: 2,
  },

  offerTitle: {
    color: "#ffffff",

    textAlign: "center",

    fontSize: 28,

    fontWeight: "900",

    marginTop: 10,

    zIndex: 2,
  },

  offerPriceRow: {
    flexDirection: "row",

    alignItems: "baseline",
    justifyContent: "center",

    marginTop: 3,

    zIndex: 2,
  },

  offerCurrency: {
    color: "#ffe500",

    fontSize: 30,
    lineHeight: 40,

    fontWeight: "900",

    marginRight: 7,
  },

  offerPrice: {
    color: "#ffe500",

    fontSize: 80,
    lineHeight: 90,

    fontWeight: "900",
  },

  offerYear: {
    color: "#ffe500",

    fontSize: 18,

    fontWeight: "900",

    marginTop: -3,

    zIndex: 2,
  },

  offerDescription: {
    color: "#9eb0cb",

    fontSize: 16,

    textAlign: "center",

    maxWidth: 500,

    lineHeight: 24,

    marginTop: 12,

    zIndex: 2,
  },

  offerButton: {
    backgroundColor: "#ffe000",

    paddingHorizontal: 35,
    paddingVertical: 16,

    borderRadius: 12,

    marginTop: 25,

    zIndex: 3,
  },

  offerButtonText: {
    color: "#121212",

    fontSize: 16,

    fontWeight: "900",
  },

  offerDisclaimer: {
    color: "#5d6b7f",

    fontSize: 12,

    marginTop: 13,

    textAlign: "center",

    zIndex: 2,
  },

  /* FAQ */

  faqSection: {
    width: "100%",

    backgroundColor: "transparent",

    paddingHorizontal: 20,

    paddingTop: 15,
    paddingBottom: 90,
  },

  faqInner: {
    width: "100%",

    maxWidth: 760,

    alignSelf: "center",
  },

  faqSectionTitle: {
    color: "#f8fafc",

    textAlign: "center",

    fontSize: 42,
    lineHeight: 50,

    fontWeight: "900",

    letterSpacing: -1.3,

    marginBottom: 28,
  },

  faq: {
    width: "100%",

    backgroundColor:
      "rgba(9, 19, 33, 0.88)",

    borderWidth: 1,
    borderColor: "#243147",

    borderRadius: 10,

    paddingHorizontal: 20,
    paddingVertical: 19,

    marginTop: 12,
  },

  faqOpen: {
    borderColor: "#34445e",
  },

  faqHeader: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",
  },

  faqArrowBox: {
    width: 25,
    height: 29,

    marginRight: 8,

    flexShrink: 0,

    alignItems: "flex-start",
    justifyContent: "center",
  },

  faqArrow: {
    color: "#ffffff",

    fontSize: 25,
    lineHeight: 25,

    fontWeight: "400",

    width: 25,
    height: 25,

    textAlign: "left",

    includeFontPadding: false,

    flexShrink: 0,
  },

  faqQuestion: {
    color: "#ffffff",

    fontSize: 15,

    fontWeight: "900",

    flex: 1,
  },

  faqAnswer: {
    color: "#8294af",

    fontSize: 14,
    lineHeight: 21,

    marginTop: 13,
    marginLeft: 33,

    paddingRight: 10,
  },

  /* FOOTER */

  footer: {
    width: "100%",

    backgroundColor: "transparent",

    borderTopWidth: 1,
    borderTopColor:
      "rgba(60, 83, 120, 0.45)",

    alignItems: "center",

    paddingVertical: 45,
  },

  footerLogo: {
    color: "#ffffff",

    fontSize: 24,

    fontWeight: "900",

    textAlign: "center",
  },

  footerText: {
    color: "#66758d",

    fontSize: 13,

    marginTop: 9,
  },

  footerCopyright: {
    color: "#414e62",

    fontSize: 11,

    marginTop: 10,
  },
});