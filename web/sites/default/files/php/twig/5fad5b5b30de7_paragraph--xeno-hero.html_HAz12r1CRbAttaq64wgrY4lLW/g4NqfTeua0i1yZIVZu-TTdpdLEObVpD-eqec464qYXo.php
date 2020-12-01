<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* modules/custom/xeno_hero/templates/paragraph--xeno-hero.html.twig */
class __TwigTemplate_7190d7a50b75df1762b4ab15430f133a7eab4fcd5644ec2ce792af9c0fe6458d extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 51, "if" => 60];
        $filters = ["escape" => 47, "clean_class" => 53, "render" => 60, "merge" => 110, "without" => 141];
        $functions = ["attach_library" => 47];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['escape', 'clean_class', 'render', 'merge', 'without'],
                ['attach_library']
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 46
        echo "
";
        // line 47
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("xeno_hero/xeno-hero"), "html", null, true);
        echo "

";
        // line 51
        $context["classes"] = [0 => "paragraph", 1 => ("paragraph--type--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 53
($context["paragraph"] ?? null), "bundle", [])))), 2 => ((        // line 54
($context["view_mode"] ?? null)) ? (("paragraph--view-mode--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["view_mode"] ?? null))))) : (""))];
        // line 57
        echo "
";
        // line 60
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "xeno_overlay", []))) {
            // line 61
            echo "  ";
            $context["overlay_level"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "xeno_overlay", []), "#items", [], "array"), "getString", [], "method");
            // line 62
            echo "  ";
            $context["overlay_levels"] = [0 => ((("1" ==             // line 63
($context["overlay_level"] ?? null))) ? ("1") : ("")), 1 => ((("2" ==             // line 64
($context["overlay_level"] ?? null))) ? ("2") : ("")), 2 => ((("3" ==             // line 65
($context["overlay_level"] ?? null))) ? ("3") : ("")), 3 => ((("4" ==             // line 66
($context["overlay_level"] ?? null))) ? ("4") : ("")), 4 => ((("5" ==             // line 67
($context["overlay_level"] ?? null))) ? ("5") : ("")), 5 => ((("6" ==             // line 68
($context["overlay_level"] ?? null))) ? ("6") : ("")), 6 => ((("7" ==             // line 69
($context["overlay_level"] ?? null))) ? ("7") : ("")), 7 => ((("8" ==             // line 70
($context["overlay_level"] ?? null))) ? ("8") : ("")), 8 => ((("9" ==             // line 71
($context["overlay_level"] ?? null))) ? ("9") : (""))];
        }
        // line 75
        echo "
";
        // line 78
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "xeno_parallax", []))) {
            // line 79
            echo "  ";
            $context["parallax_speed"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "xeno_parallax", []), "#items", [], "array"), "getString", [], "method");
            // line 80
            echo "  ";
            $context["parallax_speeds"] = [0 => ((("1" ==             // line 81
($context["parallax_speed"] ?? null))) ? ("1") : ("")), 1 => ((("2" ==             // line 82
($context["parallax_speed"] ?? null))) ? ("2") : ("")), 2 => ((("3" ==             // line 83
($context["parallax_speed"] ?? null))) ? ("3") : ("")), 3 => ((("4" ==             // line 84
($context["parallax_speed"] ?? null))) ? ("4") : ("")), 4 => ((("5" ==             // line 85
($context["parallax_speed"] ?? null))) ? ("5") : ("")), 5 => ((("6" ==             // line 86
($context["parallax_speed"] ?? null))) ? ("6") : (""))];
        }
        // line 90
        echo "
";
        // line 93
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "xeno_offset", []))) {
            // line 94
            echo "  ";
            $context["parallax_offset"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "xeno_offset", []), "#items", [], "array"), "getString", [], "method");
        }
        // line 96
        echo "
";
        // line 99
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "xeno_invert", []))) {
            // line 100
            echo "  ";
            $context["invert_level"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "xeno_invert", []), "#items", [], "array"), "getString", [], "method");
            // line 101
            echo "  ";
            $context["invert_levels"] = [0 => ((("invert" ==             // line 102
($context["invert_level"] ?? null))) ? ("paragraph--overlay--invert") : (""))];
        }
        // line 106
        echo "
";
        // line 108
        $context["invert_field"] = $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "xeno_invert", [])));
        // line 109
        if (($context["invert_field"] ?? null)) {
            // line 110
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), $this->sandbox->ensureToStringAllowed(($context["invert_levels"] ?? null)));
        }
        // line 112
        echo "
";
        // line 115
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "xeno_zoom", []))) {
            // line 116
            echo "  ";
            $context["zoom_level"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "xeno_zoom", []), "#items", [], "array"), "getString", [], "method");
            // line 117
            echo "  ";
            $context["zoom_levels"] = [0 => ((("1" ==             // line 118
($context["zoom_level"] ?? null))) ? ("paragraph--zoom paragraph--zoom--1") : ("")), 1 => ((("2" ==             // line 119
($context["zoom_level"] ?? null))) ? ("paragraph--zoom paragraph--zoom--2") : ("")), 2 => ((("3" ==             // line 120
($context["zoom_level"] ?? null))) ? ("paragraph--zoom paragraph--zoom--3") : ("")), 3 => ((("4" ==             // line 121
($context["zoom_level"] ?? null))) ? ("paragraph--zoom paragraph--zoom--4") : ("")), 4 => ((("5" ==             // line 122
($context["zoom_level"] ?? null))) ? ("paragraph--zoom paragraph--zoom--5") : ("")), 5 => ((("6" ==             // line 123
($context["zoom_level"] ?? null))) ? ("paragraph--zoom paragraph--zoom--6") : (""))];
            // line 126
            echo " ";
        }
        // line 127
        echo "
";
        // line 129
        $context["zoom_field"] = $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "xeno_zoom", [])));
        // line 130
        if (($context["zoom_field"] ?? null)) {
            // line 131
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), $this->sandbox->ensureToStringAllowed(($context["zoom_levels"] ?? null)));
        }
        // line 133
        echo "
";
        // line 135
        echo "<div";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method"), "setAttribute", [0 => "data-overlay", 1 => ($context["overlay_levels"] ?? null)], "method"), "setAttribute", [0 => "data-speed", 1 => ($context["parallax_speeds"] ?? null)], "method"), "setAttribute", [0 => "data-offset", 1 => ($context["parallax_offset"] ?? null)], "method")), "html", null, true);
        echo ">
  ";
        // line 136
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "xeno_background_image", []))) {
            // line 137
            echo "    <div class=\"paragraph--type--xeno-hero__image\">
      ";
            // line 138
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "xeno_background_image", [])), "html", null, true);
            echo "
    </div>
  ";
        }
        // line 141
        echo "  ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->withoutFilter($this->sandbox->ensureToStringAllowed(($context["content"] ?? null)), "xeno_background_image", "xeno_invert", "xeno_offset", "xeno_overlay", "xeno_parallax"), "html", null, true);
        echo "
</div>
";
    }

    public function getTemplateName()
    {
        return "modules/custom/xeno_hero/templates/paragraph--xeno-hero.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  189 => 141,  183 => 138,  180 => 137,  178 => 136,  173 => 135,  170 => 133,  166 => 131,  164 => 130,  162 => 129,  159 => 127,  156 => 126,  154 => 123,  153 => 122,  152 => 121,  151 => 120,  150 => 119,  149 => 118,  147 => 117,  144 => 116,  142 => 115,  139 => 112,  135 => 110,  133 => 109,  131 => 108,  128 => 106,  125 => 102,  123 => 101,  120 => 100,  118 => 99,  115 => 96,  111 => 94,  109 => 93,  106 => 90,  103 => 86,  102 => 85,  101 => 84,  100 => 83,  99 => 82,  98 => 81,  96 => 80,  93 => 79,  91 => 78,  88 => 75,  85 => 71,  84 => 70,  83 => 69,  82 => 68,  81 => 67,  80 => 66,  79 => 65,  78 => 64,  77 => 63,  75 => 62,  72 => 61,  70 => 60,  67 => 57,  65 => 54,  64 => 53,  63 => 51,  58 => 47,  55 => 46,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "modules/custom/xeno_hero/templates/paragraph--xeno-hero.html.twig", "/var/www/pendeedus.mindimage.net/web/modules/custom/xeno_hero/templates/paragraph--xeno-hero.html.twig");
    }
}
