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

/* themes/custom/pendeedus/templates/paragraph--bp-grid.html.twig */
class __TwigTemplate_a0cb430c8a274b2051fa033974ea9e9395d8ea3d9b1cd35f2dca9774c3cf2812 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 41, "set" => 48];
        $filters = ["escape" => 40, "render" => 47, "clean_class" => 128, "merge" => 136, "without" => 149];
        $functions = ["attach_library" => 40];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                ['escape', 'render', 'clean_class', 'merge', 'without'],
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
        // line 39
        echo "
";
        // line 40
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("bootstrap_paragraphs/bootstrap-paragraphs"), "html", null, true);
        echo "
";
        // line 41
        if (($this->getAttribute(($context["paragraph"] ?? null), "bundle", []) == "bp_columns")) {
            // line 42
            echo "  ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("bootstrap_paragraphs/bp-columns"), "html", null, true);
            echo "
";
        }
        // line 44
        echo "
";
        // line 47
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "bp_width", []))) {
            // line 48
            echo "  ";
            $context["layout_width"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "bp_width", []), "#items", [], "array"), "getString", [], "method");
            // line 49
            echo "  ";
            $context["layout_width_classes"] = [0 => ((("paragraph--width--tiny" ==             // line 50
($context["layout_width"] ?? null))) ? ("paragraph--width--tiny") : ("")), 1 => ((("paragraph--width--narrow" ==             // line 51
($context["layout_width"] ?? null))) ? ("paragraph--width--narrow") : ("")), 2 => ((("paragraph--width--medium" ==             // line 52
($context["layout_width"] ?? null))) ? ("paragraph--width--medium") : ("")), 3 => ((("paragraph--width--wide" ==             // line 53
($context["layout_width"] ?? null))) ? ("paragraph--width--wide") : ("")), 4 => ((("paragraph--width--full" ==             // line 54
($context["layout_width"] ?? null))) ? ("paragraph--width--full") : (""))];
        }
        // line 57
        echo "
";
        // line 60
        if ($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "bp_background", []))) {
            // line 61
            echo "  ";
            $context["layout_background"] = $this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "bp_background", []), "#items", [], "array"), "getString", [], "method");
            // line 62
            echo "  ";
            $context["layout_background_classes"] = [0 => ((("paragraph--color paragraph--color--rgba-black-slight" ==             // line 63
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-black-slight") : ("")), 1 => ((("paragraph--color paragraph--color--rgba-black-light" ==             // line 64
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-black-light") : ("")), 2 => ((("paragraph--color paragraph--color--rgba-black-strong" ==             // line 65
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-black-strong") : ("")), 3 => ((("paragraph--color paragraph--color--rgba-blue-slight" ==             // line 66
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-black-strong") : ("")), 4 => ((("paragraph--color paragraph--color--rgba-blue-light" ==             // line 67
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-blue-light") : ("")), 5 => ((("paragraph--color paragraph--color--rgba-blue-strong" ==             // line 68
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-blue-strong") : ("")), 6 => ((("paragraph--color paragraph--color--rgba-bluegrey-slight" ==             // line 69
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-bluegrey-slight") : ("")), 7 => ((("paragraph--color paragraph--color--rgba-bluegrey-light" ==             // line 70
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-bluegrey-light") : ("")), 8 => ((("paragraph--color paragraph--color--rgba-bluegrey-strong" ==             // line 71
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-bluegrey-strong") : ("")), 9 => ((("paragraph--color paragraph--color--rgba-brown-slight" ==             // line 72
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-brown-slight") : ("")), 10 => ((("paragraph--color paragraph--color--rgba-brown-light" ==             // line 73
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-brown-light") : ("")), 11 => ((("paragraph--color paragraph--color--rgba-brown-strong" ==             // line 74
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-brown-strong") : ("")), 12 => ((("paragraph--color paragraph--color--rgba-cyan-slight" ==             // line 75
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-cyan-slight") : ("")), 13 => ((("paragraph--color paragraph--color--rgba-cyan-light" ==             // line 76
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-cyan-light") : ("")), 14 => ((("paragraph--color paragraph--color--rgba-cyan-strong" ==             // line 77
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-cyan-strong") : ("")), 15 => ((("paragraph--color paragraph--color--rgba-green-slight" ==             // line 78
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-green-slight") : ("")), 16 => ((("paragraph--color paragraph--color--rgba-green-light" ==             // line 79
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-green-light") : ("")), 17 => ((("paragraph--color paragraph--color--rgba-green-strong" ==             // line 80
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-green-strong") : ("")), 18 => ((("paragraph--color paragraph--color--rgba-grey-slight" ==             // line 81
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-grey-slight") : ("")), 19 => ((("paragraph--color paragraph--color--rgba-grey-light" ==             // line 82
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-grey-light") : ("")), 20 => ((("paragraph--color paragraph--color--rgba-grey-strong" ==             // line 83
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-grey-strong") : ("")), 21 => ((("paragraph--color paragraph--color--rgba-indigo-slight" ==             // line 84
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-indigo-slight") : ("")), 22 => ((("paragraph--color paragraph--color--rgba-indigo-light" ==             // line 85
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-indigo-light") : ("")), 23 => ((("paragraph--color paragraph--color--rgba-indigo-strong" ==             // line 86
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-indigo-strong") : ("")), 24 => ((("paragraph--color paragraph--color--rgba-lime-slight" ==             // line 87
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-lime-slight") : ("")), 25 => ((("paragraph--color paragraph--color--rgba-lime-light" ==             // line 88
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-lime-light") : ("")), 26 => ((("paragraph--color paragraph--color--rgba-lime-strong" ==             // line 89
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-lime-strong") : ("")), 27 => ((("paragraph--color paragraph--color--rgba-orange-slight" ==             // line 90
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-orange-slight") : ("")), 28 => ((("paragraph--color paragraph--color--rgba-orange-light" ==             // line 91
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-orange-light") : ("")), 29 => ((("paragraph--color paragraph--color--rgba-orange-strong" ==             // line 92
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-orange-strong") : ("")), 30 => ((("paragraph--color paragraph--color--rgba-pink-slight" ==             // line 93
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-pink-slight") : ("")), 31 => ((("paragraph--color paragraph--color--rgba-pink-light" ==             // line 94
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-pink-light") : ("")), 32 => ((("paragraph--color paragraph--color--rgba-pink-strong" ==             // line 95
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-pink-strong") : ("")), 33 => ((("paragraph--color paragraph--color--rgba-purple-slight" ==             // line 96
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-purple-slight") : ("")), 34 => ((("paragraph--color paragraph--color--rgba-purple-light" ==             // line 97
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-purple-light") : ("")), 35 => ((("paragraph--color paragraph--color--rgba-purple-strong" ==             // line 98
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-purple-strong") : ("")), 36 => ((("paragraph--color paragraph--color--rgba-red-slight" ==             // line 99
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-red-slight") : ("")), 37 => ((("paragraph--color paragraph--color--rgba-red-light" ==             // line 100
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-red-light") : ("")), 38 => ((("paragraph--color paragraph--color--rgba-red-strong" ==             // line 101
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-red-strong") : ("")), 39 => ((("paragraph--color paragraph--color--rgba-stylish-slight" ==             // line 102
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-stylish-slight") : ("")), 40 => ((("paragraph--color paragraph--color--rgba-stylish-light" ==             // line 103
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-stylish-light") : ("")), 41 => ((("paragraph--color paragraph--color--rgba-stylish-strong" ==             // line 104
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-stylish-strong") : ("")), 42 => ((("paragraph--color paragraph--color--rgba-teal-slight" ==             // line 105
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-teal-slight") : ("")), 43 => ((("paragraph--color paragraph--color--rgba-teal-light" ==             // line 106
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-teal-light") : ("")), 44 => ((("paragraph--color paragraph--color--rgba-teal-strong" ==             // line 107
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-teal-strong") : ("")), 45 => ((("paragraph--color paragraph--color--rgba-white-slight" ==             // line 108
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-white-slight") : ("")), 46 => ((("paragraph--color paragraph--color--rgba-white-light" ==             // line 109
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-white-light") : ("")), 47 => ((("paragraph--color paragraph--color--rgba-white-strong" ==             // line 110
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-white-strong") : ("")), 48 => ((("paragraph--color paragraph--color--rgba-yellow-slight" ==             // line 111
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-yellow-slight") : ("")), 49 => ((("paragraph--color paragraph--color--rgba-yellow-light" ==             // line 112
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-yellow-light") : ("")), 50 => ((("paragraph--color paragraph--color--rgba-yellow-strong" ==             // line 113
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--rgba-yellow-strong") : ("")), 51 => ((("paragraph--color--transparent" ==             // line 114
($context["layout_background"] ?? null))) ? ("paragraph--color--transparent") : ("")), 52 => ((("paragraph--color paragraph--color--primary" ==             // line 115
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--primary") : ("")), 53 => ((("paragraph--color paragraph--color--secondary" ==             // line 116
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--secondary") : ("")), 54 => ((("paragraph--color paragraph--color--success" ==             // line 117
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--success") : ("")), 55 => ((("paragraph--color paragraph--color--info" ==             // line 118
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--info") : ("")), 56 => ((("paragraph--color paragraph--color--warning" ==             // line 119
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--warning") : ("")), 57 => ((("paragraph--color paragraph--color--danger" ==             // line 120
($context["layout_background"] ?? null))) ? ("paragraph--color paragraph--color--danger") : (""))];
        }
        // line 123
        echo "
";
        // line 126
        $context["classes"] = [0 => "paragraph", 1 => ("paragraph--type--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 128
($context["paragraph"] ?? null), "bundle", [])))), 2 => ((        // line 129
($context["view_mode"] ?? null)) ? (("paragraph--view-mode--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["view_mode"] ?? null))))) : ("")), 3 => ("paragraph--id--" . $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(        // line 130
($context["paragraph"] ?? null), "id", []), "value", [])))];
        // line 132
        echo "
";
        // line 134
        $context["width_field"] = $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "bp_width", [])));
        // line 135
        if (($context["width_field"] ?? null)) {
            // line 136
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), $this->sandbox->ensureToStringAllowed(($context["layout_width_classes"] ?? null)));
        }
        // line 138
        echo "
";
        // line 140
        $context["background_field"] = $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "bp_background", [])));
        // line 141
        if (($context["background_field"] ?? null)) {
            // line 142
            echo "  ";
            $context["classes"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["classes"] ?? null)), $this->sandbox->ensureToStringAllowed(($context["layout_background_classes"] ?? null)));
        }
        // line 144
        echo "
";
        // line 146
        echo "<div";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method")), "html", null, true);
        echo ">
  <div class=\"container\">
    <div class=\"row\">
      ";
        // line 149
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->withoutFilter($this->sandbox->ensureToStringAllowed(($context["content"] ?? null)), "bp_width", "bp_background"), "html", null, true);
        echo "
    </div>
  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "themes/custom/pendeedus/templates/paragraph--bp-grid.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  197 => 149,  190 => 146,  187 => 144,  183 => 142,  181 => 141,  179 => 140,  176 => 138,  172 => 136,  170 => 135,  168 => 134,  165 => 132,  163 => 130,  162 => 129,  161 => 128,  160 => 126,  157 => 123,  154 => 120,  153 => 119,  152 => 118,  151 => 117,  150 => 116,  149 => 115,  148 => 114,  147 => 113,  146 => 112,  145 => 111,  144 => 110,  143 => 109,  142 => 108,  141 => 107,  140 => 106,  139 => 105,  138 => 104,  137 => 103,  136 => 102,  135 => 101,  134 => 100,  133 => 99,  132 => 98,  131 => 97,  130 => 96,  129 => 95,  128 => 94,  127 => 93,  126 => 92,  125 => 91,  124 => 90,  123 => 89,  122 => 88,  121 => 87,  120 => 86,  119 => 85,  118 => 84,  117 => 83,  116 => 82,  115 => 81,  114 => 80,  113 => 79,  112 => 78,  111 => 77,  110 => 76,  109 => 75,  108 => 74,  107 => 73,  106 => 72,  105 => 71,  104 => 70,  103 => 69,  102 => 68,  101 => 67,  100 => 66,  99 => 65,  98 => 64,  97 => 63,  95 => 62,  92 => 61,  90 => 60,  87 => 57,  84 => 54,  83 => 53,  82 => 52,  81 => 51,  80 => 50,  78 => 49,  75 => 48,  73 => 47,  70 => 44,  64 => 42,  62 => 41,  58 => 40,  55 => 39,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/pendeedus/templates/paragraph--bp-grid.html.twig", "/var/www/pendeedus.mindimage.net/web/themes/custom/pendeedus/templates/paragraph--bp-grid.html.twig");
    }
}
